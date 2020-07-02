<template>
  <section class="container">
    <div>
      <h3 class="title">Cart</h3>
      <div v-if="cartLength < 1">There is no pizza yet. You can <router-link to="/">add something</router-link>!</div>
      <div v-if="cartLength > 0">
        <b-table
          :data="cartData"
          :striped="true">
          <template slot-scope="props">
            <b-table-column field="title" label="Title">
              {{ props.row.title }}
            </b-table-column>
            <b-table-column field="amount" label="Amount" numeric>
              {{ props.row.amount }}
            </b-table-column>
            <b-table-column field="price" label="Price" numeric>
              {{ props.row.price }}
            </b-table-column>
            <b-table-column field="cost" label="Cost" numeric>
              {{ props.row.cost }}
            </b-table-column>
            <b-table-column field="removable" label="Remove" class="removable">
              <input v-if="props.row.removable" type="button" @click="remove(props.row.removable)" value="Remove" />
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>

    <div class="delivery-block" v-if="cartLength > 0">
      <h3 class="title">Delivery form</h3>
      <form class="delivery-form" @submit="dispatchDelivery">

        <b-field label="Name">
          <b-input
            type="text"
            v-model="formName"
            placeholder="Your name"
            required>
          </b-input>
        </b-field>

        <b-field label="Surname">
          <b-input
            type="text"
            v-model="formSurname"
            placeholder="Your surname"
            required>
          </b-input>
        </b-field>

        <b-field label="Address">
          <b-input
            type="text"
            v-model="formAddress"
            placeholder="Delivery to address"
            required>
          </b-input>
        </b-field>

        <b-field label="Phone number">
          <b-input
            type="text"
            v-model="formPhone"
            placeholder="Your contact phone"
            required>
          </b-input>
        </b-field>

        <b-checkbox v-model="acceptPrivacy"> I agree to send this data</b-checkbox>
        <div v-if="formError" class="error">{{ formError }}</div>
        <hr/>
        <div>Delivery cost: {{ $store.state.currentCurrency }}{{ deliveryCost }}</div>
        <div>Total: {{ $store.state.currentCurrency }}{{ finalCost }}</div>
        <hr/>
        <div class="center-the-submit-button">
          <input name="submit" type="submit" v-bind:class="['button', acceptPrivacy ? 'is-primary' : '']" value="Send me my pizza!" v-bind:disabled="!acceptPrivacy" />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'cart',
    data () {
      return {
        needToUpdatePrices: 0,
        formName: null,
        formSurname: null,
        formAddress: '',
        formPhone: null,
        acceptPrivacy: false,
        formError: null
      }
    },
    methods: {
      remove(id) {
        this.$store.dispatch('removeFromCart', { id: id })
        this.needToUpdatePrices += 1
        this.$buefy.notification.open({message: 'The position has removed.', position: 'is-bottom-right'})
      },
      async dispatchDelivery(event) {
        event.preventDefault();
        this.formError = null
        try {
          const { data } = await axios.post('/api/send_order', {
            name: this.formName,
            surname: this.formSurname,
            phone: this.formPhone,
            address: this.formAddress,
            cart: this.$store.state.cart,
            currency: this.$store.state.currentCurrency,
            deliveryCost: this.deliveryCost,
            totalCost: this.finalCost
          })
          this.$store.dispatch('dropCart')
          this.needToUpdatePrices += 1
        } catch (error) {
          this.formError = 'Something wrong.'
        }
      }
    },
    computed: {
      finalCost: function() {
        return Math.round(100 * (this.cartData[this.cartData.length-1].costRaw + this.deliveryCost)) / 100
      },
      deliveryCost: function() {
        // It is stub and cheap function, of course.
        return Math.round(100 * this.$store.state.priceCoeff * (1 + this.formAddress.length / 10)) / 100
      },
      cartLength: function() {
        let needToUpdatePrices = this.needToUpdatePrices
        return Object.keys(this.$store.state.cart).length
      },
      cartData: function() {
        let needToUpdatePrices = this.needToUpdatePrices
        let result = []
        let total = 0
        for (var id in this.$store.state.cart) {
          var product = this.$store.state.cart[id]
          var cost = Math.round(product.price * product.amount * this.$store.state.priceCoeff * 100) / 100
          result.push({
            title: product.title,
            price: this.$store.state.currentCurrency + (Math.round(product.price * this.$store.state.priceCoeff * 100) / 100),
            amount: product.amount,
            cost: this.$store.state.currentCurrency + cost,
            removable: id
          })
          total += cost
        }
        result.push({
          title: 'Total',
          costRaw: Math.round(total * 100) / 100,
          cost: this.$store.state.currentCurrency + Math.round(total * 100) / 100
        })

        return result
      }
    }
  }
</script>

<style scoped>
.removable {
  text-align: right;
}

.delivery-block {
  margin-top: 3em;
}

.delivery-form {
  background: #EEF;
  border-radius: 1em;
  padding: 1em;
}

.center-the-submit-button {
  text-align: center;
}

.error {
  color: red;
}
</style>
