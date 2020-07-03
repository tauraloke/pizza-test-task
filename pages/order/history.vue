<template>
  <section class="container">
    <div v-if="!$store.state.authUser">You need create account and sign in to see this page.</div>
    <div v-if="$store.state.authUser">
      <h4 class="title">My orders</h4>
      <div v-if="userOrders===null">Loading...</div>
      <div v-if="userOrders===-1" class="error">Sorry, cannot load order info. Try to update the page.</div>
      <div v-if="userOrders && Array.isArray(userOrders.data)">
        <ul>
          <li v-for="order in userOrders.data" :key="order.id">
            Order with cost {{order.currency}}{{order.total_cost}} at {{ order.created_at }}
            <ul>
              <li v-for="product in order.cart" :key="product.id">{{ product.title }}: {{product.amount}}</li>
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
        console.log(this.userOrders.data[0].id)
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
  ul {
    margin-left: 1em;
    list-style: circle;
  }

  li {
    margin-left: 1em;
  }
</style>
