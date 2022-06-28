/*
 * Convert array to tree, array item id is related pid default;
 * Defined yourself related params in parameter you can;
 * put child item into children field;
 * @params {Array} arr = [{id:1,pid:0,name:'level 1'},{id:2,pid:1,name:'level 2'},...]
 * @return {Array}
 * */
export function array2tree(arr, keyName = 'id', parentKeyName = 'pid') {
  if (!Array.isArray(arr)) {
    throw new Error('params arr need Array');
  }
  for (let i = 0; i < arr.length; i++) {
    if (!(keyName in arr[i]) || !(parentKeyName in arr[i])) {
      throw new Error(`params index ${i} has not key ${keyName} or ${parentKeyName}`);
    }
  }
  const map = {};
  /*
    let i,l = arr.length;
    for (i = 0; i < l;i++){
        const v = arr[i];
        map[v[keyName]] = v;
    }
     */
  arr.forEach((v)=> {
    v.children = [];
    map[v[keyName]] = v;
  });
  map[0] = {[keyName]: 0, name: 'root', children: []};
  /*
    let i,l = arr.length;
    for (i = 0; i < l;i++){
        const v = arr[i];
        map[v[parentKeyName]].children.push(v);
    }
     */
  arr.forEach((v)=> {
    map[v[parentKeyName]].children.push(v);
  });
  return map[0].children;
}

export function tree2array(tree) {

}
