<template>
  <div class="cart">
    <nav-bar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>


    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
  

    <bottom-bar />


  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar"

// import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  methods: {},
  computed: {
    // cartList() {
    //   return this.$store.getters.cartList;
    // },
    cartLength() {
      return this.$store.state.cartList.length;
    }
    // ...mapGetters({
    //   length:'cartLength',
    //   list: 'cartList'
    // })
  }
};
</script>

<style>
.cart {
  height: 100vh;
}

.nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  width: 100%;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}
</style>