<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <div class="content">
      <!-- <ul><li class="li" v-for="item in $store.state.cartList">{{item}}</li></ul> -->
      <detail-swiper id="detailswi" :topimages="topimages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailGoodsLoad="detailGoodsLoad" />
      <detail-param-info class="param" :param-info="paramInfo" />
      <detail-comment-info class="comment" :comment-info="commentInfo" />
      <goods-list class="recommend" :goods="recommendList" />
    </div>

    <detail-bottom-bar class="bottom" @addCart="addToCart"/>
    <back-top class="back" @click.native="backClick" v-show="isShowBackTop"/>
    <toast :message="message" :show="show" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Toast from "components/common/toast/Toast"

import { debounce } from "common/utils.js";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";
import { backTopMixin } from "@/common/mixin";
import { BACKTOP_DISTANCE } from "@/common/const";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,

    GoodsList,
    BackTop,
    Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topimages: [], //轮播图
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}, //参数信息
      commentInfo: {}, //评论信息
      recommendList: [], //推荐数据
      themeTops: [], //y值
      currentIndex: 0,
      scrolly: '',
      isShowBackTop: false,
      message: '',
      show: false
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid来请求数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 2.1 获取商品顶部轮播图信息
      this.topimages = data.itemInfo.topImages;

      // 2.2 获取商品基本信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.3 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.4 获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 2.5 保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 2.6.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then(res => {
      this.recommendList = res.data.list;
    });
  },
  mounted() {
    window.addEventListener('scroll', this.contentScroll)
  },
  methods: {
    titleClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          window.scrollTo(0, this.themeTops[0]);
          break;
        case 1:
          window.scrollTo(0, this.themeTops[1]);
          break;
        case 2:
          window.scrollTo(0, this.themeTops[2]);
          break;
        case 3:
          window.scrollTo(0, this.themeTops[3]);
          break;
      }
    },

    detailGoodsLoad: debounce(function() {
      this.themeTops = []
      let off0 = 0
      let off1 = document.querySelector(".param").offsetTop
      let off2 = document.querySelector(".comment").offsetTop
      let off3 = document.querySelector(".recommend").offsetTop
      console.log(off0, off1, off2, off3)
      this.themeTops.push(off0)
      this.themeTops.push(off1)
      this.themeTops.push(off2)
      this.themeTops.push(off3)
      this.themeTops.push(Number.MAX_VALUE)
    }, 100),

    contentScroll(){
      this.scrolly = window.scrollY
      this.isShowBackTop = this.scrolly > 1000;
      // console.log(this.scrolly);
      let length = this.themeTops.length
      for(let i=0; i<length-1; i++){
        if(this.currentIndex!==i && (this.scrolly >= this.themeTops[i] && this.scrolly < this.themeTops[i+1])){
          this.currentIndex = i
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },

    backClick() {
      window.scrollTo(0, 0);
    },

    addToCart(){
      // 1.获取信息
      const product = {}
      product.image = this.topimages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid
      // 2.加入到购物车 
      this.$store.dispatch('addCart', product).then(res => {
        console.log(res);
        this.show = true
        this.message = res

        setTimeout(() => {
          this.show = false
          this.message = ''
        }, 1500);
      })
    }
  }
}
</script>

<style scoped>
.detail-nav {
  position: fixed;
  z-index: 9;
  width: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
}

.content {
  position: relative;
  z-index: 1;
  background-color: #fff;
  margin-top: 44px;
  /* height: calc(100% - 44px - 56px); */
}

.li{
  width: 100%;
  overflow: hidden;
}

.back{
  z-index: 9;
}

.bottom{
  z-index: 9;
}
</style>