<template>
  <section class="container">
    <div v-if="!$store.state.authUser" key="no-auth-message">You need create account and sign in to see this page.</div>
    <div v-else key="order-history">
      <h4 class="title">My orders</h4>
      <div v-if="userOrders===null" key="loading">Loading...</div>
      <div v-if="userOrders===-1" class="error" key="error">Sorry, cannot load order info. Try to update the page.</div>
      <div v-if="userOrders && Array.isArray(userOrders.data)" key="orders">
        <div v-if="userOrders.data.length === 0" key="no-orders-message">There is no order history yet.</div>
        <ul v-else key="order-list">
          <li v-for="order in userOrders.data" :key="order.id">
            Order with cost {{order.currency}}{{order.total_cost}} at {{ order.created_at }}
            <ul class="product-list">
              <li v-for="product in order.cart" :key="product.id" class="product-list__item">{{ product.title }}: {{product.amount}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'orders',
    data () {
      return {
        userOrders: null,
      }
    },
    created: async function() {
      try {
        this.userOrders = await axios.get('/api/orders.json')
      } catch (error) {
        this.userOrders = -1
      }
    },
    computed: {
      somethingComputed: function() {
        return 1
      }
    }
  }
</script>

<style scoped>
  .product-list {
    margin-left: 1em;
    list-style: circle;
  }

  .product-list .product-list__item {
    margin-left: 1em;
  }
</style>
