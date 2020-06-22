<template>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="titles" slot="center" >
        <span class="title-item" 
                v-for="(item, index) in titles"
                :class="{'active': index === currentIndex}"
                @click="titleClick(index)">{{item}}</span>
      </div>
    </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods:{
    backClick(){
      this.$router.go(-1)
    },
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
      
    }
  }
};
</script>

<style scoped>
  .back{
    margin-top: 5px;
  }
  .titles{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: red;
  }
</style>