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
          <product-card :title="product.title" :image="product.image" :preview="product.preview" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
      { title: 'Banana pizza', image: './images/98a6fe7ef0ba426ba4e85c2b7d59c198.jpg', preview: './images/preview/1.jpg', 'price': 1.10},
      { title: 'Lobster wheel', image: './images/1200x630.jpg', preview: './images/preview/2.jpg', 'price': 1.20},
      { title: 'Corndog pizza', image: './images/corndog-pizza.jpg', preview: './images/preview/3.jpg', 'price': 1.30},
      { title: 'Peas pizza', image: './images/img_1265.jpeg', preview: './images/preview/4.jpg', 'price': 1.30},
      { title: 'Wide mouth checker', image: './images/McDonalds-Pizza.jpg', preview: './images/preview/5.jpg', 'price': 1.30},
      { title: 'Everything is a pizza if you brave enough', image: './images/new2-marg.jpg', preview: './images/preview/6.jpg', 'price': 1.30},
      { title: 'Candy pizza', image: './images/pizza-thumb-1.jpg', preview: './images/preview/7.jpg', 'price': 1.30},
      { title: 'Pizza with third eye', image: './images/pizza-toppings-eggs1.jpg', preview: './images/preview/8.jpg', 'price': 1.30},
      { title: 'Corn pizza', image: './images/corndog-pizza.jpg', preview: './images/preview/9.jpg', 'price': 1.30}
    ]
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
