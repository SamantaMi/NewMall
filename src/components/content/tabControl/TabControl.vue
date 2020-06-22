<template>
  <div class="tab-control">
    <div class="tab-control-item" 
          v-for="(item,index) in titles" 
          :key="index"
          :class="{active: index === currentIndex}"
          @click="activeClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  props:{
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex: 0
    }
  },
  methods:{
    activeClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
.tab-control{
  display: flex;
  /* 文字居中 */
  text-align: center;
  align-items: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item{
  flex: 1;
}

.tab-control-item span{
  padding: 5px;
}

.active{
  color: var(--color-tint);
}

.active span{
  border-bottom: 2px solid var(--color-tint) ;
}
</style>