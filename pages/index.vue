<template>
  <section class="container">
    <div>
      <h1 class="title">
        Pizza list
      </h1>
      <div v-if="productLoadingError" class="error" key="no-connection">Cannot display products because connection is lost...</div>
      <div class="products columns is-mobile is-multiline">
        <div v-for="product in $store.state.products" :key="product.title" class="column is-one-third-desktop is-full-mobile product-card">
          <product-item
            :title="product.title"
            :image="product.image"
            :preview="product.preview"
            :price="product.price"
            :id="product.id"
          />
        </div>
        <div v-if="!productLoadingError && $store.state.products.length==0" key="loading">Loading...</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    ProductItem: () => import('~/components/ProductItem.vue')
  },
  data () {
    return {
      products: [],
      productLoadingError: null
    }
  },
  async created() {
    if (this.$store.state.products.length > 0) {
      return
    }
    try {
        await this.$store.dispatch('getProducts')
        this.productLoadingError = null
      } catch (e) {}
  }
}
</script>

<style scoped>
</style>
