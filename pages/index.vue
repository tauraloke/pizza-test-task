<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        Pizza shop
      </h1>
      <h2 class="subtitle">
        (Just a test work.)
      </h2>
      <div class="cards">
        <div v-for="product in products" :key="product.title">
          <product-card :title="product.title" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import ProductCard from '~/components/ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data () {
    return {
      products: []
    }
  },
  created() {
    this.products = [
      { title: 'fake', 'price': 1.10},
      { title: 'fake 2', 'price': 1.20},
      { title: 'fake 3', 'price': 1.30}
    ]
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
