<template>
  <section class="container">
    <div>
      <h1 class="title">
        Pizza list
      </h1>
      <div v-if="productLoadingError" class="error">Cannot display products because connection is lost...</div>
      <div class="products columns is-mobile is-multiline">
        <div v-for="product in $store.state.products" :key="product.title" class="column is-one-third-desktop is-full-mobile product-card">
          <product-card
            :title="product.title"
            :image="product.image"
            :preview="product.preview"
            :price="product.price"
          />
        </div>
        <div v-if="!productLoadingError && $store.state.products.length==0">Loading...</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    ProductCard: () => import('~/components/ProductCard.vue')
  },
  data () {
    return {
      products: [],
      productLoadingError: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
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

<style>
  .product {
    min-height: 300px;
    text-align: center;
    border-radius: 1em;
    background: #EEE;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .product input.count {
    width: 3em;
    text-align: center;
  }

  .image {
    width: 200px;
    height: 150px;
    background: gray;
    cursor: pointer;
    margin: 5px;
    display: inline-block;
    border-radius: 50%;
    border: 3px solid #800;
  }
</style>
