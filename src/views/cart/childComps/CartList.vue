<template>
  <div class="cartlist">
    <div class="content">
      <cart-list-item  v-for="item in cartList" :key="item.iid" :item-info="item" />
    </div>

  </div>
</template>

<script>
import CartListItem from './CartListItem'

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters([
      "cartList"
    ]
    )
  }
};
</script>

<style scoped>
.cartlist{
  height: calc(100% - 133px);
}

.content{
  overflow: hidden;
}
</style>
