<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="banner.image" v-for="banner in banners">
        <a :href="banner.link">
          <img class="bannerimg" :src="banner.image" @load="imageLoad" />
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    banners: {
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
    // console.log("Current Swiper instance object", this.mySwiper);
    // this.mySwiper.slideTo(3, 1000, false);
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('bannerImageLoad')
        this.isLoad = true
      }

    }
  }
}
</script>

<style>
.bannerimg {
  flex-shrink: 0;
  width: 100%;
}
</style>