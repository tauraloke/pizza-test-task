<template>
  <section class="container">
    <login-form />
    <div>
      <h1 class="title">
        Pizza shop
      </h1>
      <h2 class="subtitle">
        (Just a test work.)
      </h2>
      <div v-if="productLoadingError" class="error">Cannot display products because connection is lost...</div>
      <div class="cards">
        <div v-for="product in $store.state.products" :key="product.title">
          <product-card :title="product.title" :image="product.image" :preview="product.preview" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    ProductCard: () => import('~/components/ProductCard.vue'),
    LoginForm: () => import('~/components/LoginForm.vue'),
  },
  data () {
    return {
      products: [],
      productLoadingError: null
    }
  },
  async created() {
    try {
        await this.$store.dispatch('getProducts')
        this.productLoadingError = null
      } catch (e) {
        this.formError = e.message
      }
  }
}
</script>

<style scoped>
  .image {
    width: calc(20% - 10px);
    cursor: pointer;
    margin: 5px;
    display: inline-block;
  }
</style>
