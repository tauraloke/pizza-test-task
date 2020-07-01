<template>
  <section class="container">
    <div>
      <h1 class="title">
        Pizza list
      </h1>
      <div v-if="productLoadingError" class="error">Cannot display products because connection is lost...</div>
      <div class="cards columns is-mobile is-multiline">
        <div v-for="product in $store.state.products" :key="product.title" class="column is-one-third">
          <product-card :title="product.title" :image="product.image" :preview="product.preview" />
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

<style scoped>
  .image {
    width: calc(20% - 10px);
    cursor: pointer;
    margin: 5px;
    display: inline-block;
  }

  .column:nth-child(3):before, .column:nth-child(3):after {
    content: "";
    display: table;
  }

  .column:nth-child(4):after {
    clear: both;
  }
</style>
