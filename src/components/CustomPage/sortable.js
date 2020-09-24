/*eslint-disable*/
/**
 *
 * source https://github.com/SortableJS/Vue.Draggable/blob/master/src/vuedraggable.js
 */
import Sortable from 'sortablejs';
import {merge} from 'lodash-es'
import {toRaw, h} from 'vue'

const defaultOps = {
}

let draggingItem = null;

export default {
  props: ['options', 'value', 'u'],
  watch:{
    options: {
      handler(val) {
        this.updateOptions(val);
      },
      deep: true
    },
  },
  data(){
    return {
      transitionMode: false,
    }
  },
  mounted() {
    this._log('sortable', 'mounted', this.value)
    this.init()
  },
  beforeDestroy(){
    this.destroy()
  },
  methods:{
    init(){
      const ops = merge({}, defaultOps, this.options)

      ops.onStart = this.onDragStart
      ops.onAdd = this.onDragAdd
      ops.onUpdate = this.onDragUpdate
      ops.onRemove = this.onDragRemove

      this._st = new Sortable(this.$el, ops);
    },
    destroy(){
      if(this._st) this._st.destroy()
    },
    updateOptions(newOptionValue) {
      for (const property in newOptionValue) {
        const value = camelize(property);
        if (!readonlyProperties.includes(value)) {
          this._st.option(value, newOptionValue[property]);
        }
      }
    },
    _log(){
      console.log(...arguments)
    },
    onDragStart(evt){
      this._log(`${this.u}:onDragStart`, evt)
      draggingItem = this.value[evt.oldIndex]
      this._log(draggingItem)
    },
    onDragAdd(evt){
      this._log(`${this.u}:onDragAdd`, evt, draggingItem)
      if(!draggingItem) return;
      removeNode(evt.item)
      this.value.splice(evt.newIndex, 0, draggingItem)
    },
    onDragUpdate(evt){
      this._log(`${this.u}:onDragUpdate`, evt, ...toRaw(this.value))
      removeNode(evt.item);
      insertNodeAt(evt.from, evt.item, evt.oldIndex);
      this.value.splice(evt.newIndex, 0, this.value.splice(evt.oldIndex, 1)[0])
      this._log(`${this.u}:onDragUpdate-end`, ...toRaw(this.value))
    },
    onDragRemove(evt){
      this._log(`${this.u}:onDragRemove`, evt)

      insertNodeAt(this.$el, evt.item, evt.oldIndex);
      if (evt.pullMode === "clone") {
        removeNode(evt.clone);
        return;
      }

      this.value.splice(evt.oldIndex, 1)
    },
  },
  render(){
    return h('div', {}, this.$slots)
  }
}

const eventsListened = ["Start", "Add", "Remove", "Update", "End"];
const eventsToEmit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
const readonlyProperties = ["Move", ...eventsListened, ...eventsToEmit].map(
  evt => "on" + evt
);


function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}
function insertNodeAt(fatherNode, node, position) {
  const refNode =
    position === 0
      ? fatherNode.children[0]
      : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}

const camelize = str => str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
