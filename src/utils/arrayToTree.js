const defaultConfig = {
    id: "id",
    parentId: "parentId",
    dataField: "data",
    childrenField: "children",
    throwIfOrphans: false,
    rootParentIds: { "": true },
    nestedIds: true,
    assign: false,
};
/**
 * Unflattens an array to a tree with runtime O(n)
 */
export function arrayToTree(items, config = {}) {
    const conf = Object.assign(Object.assign({}, defaultConfig), config);
    // the resulting unflattened tree
    const rootItems = [];
    // stores all already processed items with their ids as key so we can easily look them up
    const lookup = {};
    // stores all item ids that have not been added to the resulting unflattened tree yet
    // this is an opt-in property, since it has a slight runtime overhead
    const orphanIds = conf.throwIfOrphans
        ? new Set()
        : null;
    // idea of this loop:
    // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
    // in the lookup object and fill it with the data of the parent later
    // if an item has no parentId, add it as a root element to rootItems
    for (const item of items) {
        const itemId = conf.nestedIds
            ? getNestedProperty(item, conf.id)
            : item[conf.id];
        const parentId = conf.nestedIds
            ? getNestedProperty(item, conf.parentId)
            : item[conf.parentId];
        if (conf.rootParentIds[itemId]) {
            throw new Error(`The item array contains a node whose parentId both exists in another node and is in ` +
                `\`rootParentIds\` (\`itemId\`: "${itemId}", \`rootParentIds\`: ${Object.keys(conf.rootParentIds)
                    .map((r) => `"${r}"`)
                    .join(", ")}).`);
        }
        // look whether item already exists in the lookup table
        if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
            // item is not yet there, so add a preliminary item (its data will be added later)
            lookup[itemId] = { [conf.childrenField]: [] };
        }
        // if we track orphans, delete this item from the orphan set if it is in it
        if (orphanIds) {
            orphanIds.delete(itemId);
        }
        // add the current item's data to the item in the lookup table
        if (conf.dataField) {
            lookup[itemId][conf.dataField] = item;
        }
        else if (conf.assign) {
            lookup[itemId] = Object.assign(item, {
                [conf.childrenField]: lookup[itemId][conf.childrenField],
            });
        }
        else {
            lookup[itemId] = Object.assign(Object.assign({}, item), { [conf.childrenField]: lookup[itemId][conf.childrenField] });
        }
        const treeItem = lookup[itemId];
        if (parentId === null ||
            parentId === undefined ||
            conf.rootParentIds[parentId]) {
            // is a root item
            rootItems.push(treeItem);
        }
        else {
            // has a parent
            // look whether the parent already exists in the lookup table
            if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
                // parent is not yet there, so add a preliminary parent (its data will be added later)
                lookup[parentId] = { [conf.childrenField]: [] };
                // if we track orphans, add the generated parent to the orphan list
                if (orphanIds) {
                    orphanIds.add(parentId);
                }
            }
            // add the current item to the parent
            lookup[parentId][conf.childrenField].push(treeItem);
        }
    }
    if (orphanIds === null || orphanIds === void 0 ? void 0 : orphanIds.size) {
        throw new Error(`The items array contains orphans that point to the following parentIds: ` +
            `[${Array.from(orphanIds)}]. These parentIds do not exist in the items array. Hint: prevent orphans to result ` +
            `in an error by passing the following option: { throwIfOrphans: false }`);
    }
    if (conf.throwIfOrphans &&
        countNodes(rootItems, conf.childrenField) < Object.keys(lookup).length) {
        throw new Error(`The items array contains nodes with a circular parent/child relationship.`);
    }
    return rootItems;
}
/**
 * Returns the number of nodes in a tree in a recursive way
 * @param tree An array of nodes (tree items), each having a field `childrenField` that contains an array of nodes
 * @param childrenField Name of the property that contains the array of child nodes
 * @returns Number of nodes in the tree
 */
export function countNodes(tree, childrenField) {
    return tree.reduce((sum, n) => sum +
        1 +
        (n[childrenField] && countNodes(n[childrenField], childrenField)), 0);
}
/**
 * Returns the value of a nested property inside an item
 * Example: user can access 'id', or 'parentId' inside item = { nestedObject: { id: 'myId', parentId: 'myParentId' } }
 * using getNestedItemProperty(item, 'nestedObject.id') or getNestedItemProperty(item, 'nestedObject.parentId')
 * @param item
 * @param nestedProperty the chained properties to access the nested property. Eg: 'your.nested.property'
 */
function getNestedProperty(item, nestedProperty) {
    return nestedProperty.split(".").reduce((o, i) => o && o[i], item);
}