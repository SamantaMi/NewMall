<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="item.image" v-for="item in topimages">
        <img class="topimage" :src="item" @load="imageLoad" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    topimages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      isLoad: false
    }
  },
  mounted() {

  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        // this.$emit('bannerImageLoad')
        // this.isLoad = true
      }

    }
  }
}
</script>

<style scoped>
.swiper-slide{
  height: 400px;
  text-align: center;
}
.topimage{
  flex-shrink: 0;
  width: 100%;
}
</style>