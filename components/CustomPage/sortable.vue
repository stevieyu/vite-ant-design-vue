<template>
  <div>
    <slot />
  </div>
</template>
<script>
import Sortable from 'sortablejs';
import merge from 'lodash-es/merge'
import {toRaw} from 'vue'

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
    console.log('sortable', 'mounted', this.value)
    this.init()
  },
  beforeUpdate(){
    console.log('sortable', 'beforeUpdate')
    this.destroy()
  },
  updated(){
    console.log('sortable', 'updated')
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
    onDragStart(evt){
      console.log(`${this.u}:onDragStart`, evt)
      draggingItem = this.value[evt.oldIndex]
      console.log(draggingItem)
    },
    onDragAdd(evt){
      console.log(`${this.u}:onDragAdd`, evt, draggingItem)
      if(!draggingItem) return;
      removeNode(evt.item)
      this.value.splice(evt.newIndex, 0, draggingItem)
    },
    onDragUpdate(evt){
      console.log(`${this.u}:onDragUpdate`, evt, ...toRaw(this.value))
      removeNode(evt.item);
      insertNodeAt(evt.from, evt.item, evt.oldIndex);
      this.value.splice(evt.newIndex, 0, this.value.splice(evt.oldIndex, 1)[0])
      console.log(`${this.u}:onDragUpdate-end`, ...toRaw(this.value))
    },
    onDragRemove(evt){
      console.log(`${this.u}:onDragRemove`, evt)

      insertNodeAt(this.$el, evt.item, evt.oldIndex);
      if (evt.pullMode === "clone") {
        removeNode(evt.clone);
        return;
      }

      this.value.splice(evt.oldIndex, 1)
    },
  },
}

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
</script>
