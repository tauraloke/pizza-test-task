<template>
  <div class="product">
    <div class="product__image" @click="toggler = !toggler" v-bind:style="{ backgroundImage: `url('${preview}')` }" title="Click to see full view"></div>
    <FsLightbox
      :toggler="toggler"
      :sources="[image]"
    />
    <hr />
    <h4 class="subtitle">{{ title }}<span v-if="calcedPrice" key="calced-price">, {{ calcedPrice }}</span></h4>
    <div>
      <input type="button" value="-" @click="count = Math.max(1, count - 1)" v-bind:disabled="count<=1" v-bind:title="count > 1 ? 'Minus one' : 'Need one pizza more to use this button'" />
      <input class="product__count" v-model="count">
      <input type="button" value="+" @click="count = count + 1" title="Plus one" />
      <input type="submit" value="Add to cart" @click="updateCart" />
    </div>
  </div>
</template>


<script>
  export default {
    components: {
      FsLightbox: () => import('fslightbox-vue')
    },
    name: 'ProductItem',
    props: {
      'title': {
        type: String,
        required: true,
      },
      'image': {
        type: String,
        required: true,
      },
      'preview': {
        type: String,
        required: true,
      },
      'price': {
        type: Number,
        required: true,
      },
      'id': {
        type: Number,
        required: true,
      }
    },
    data () {
      return {
        toggler: false,
        count: 1
      }
    },
    methods: {
      updateCart() {
        this.$store.dispatch('updateCart', {
          id: this.id,
          product: {
            amount: this.count,
            title: this.title,
            price: this.price
          }
        })
        this.$buefy.notification.open({message: 'The cart is updated by ' + this.title, position: 'is-bottom-right'})
      }
    },
    computed: {
      calcedPrice: function () {
        return this.$store.state.currentCurrency + '' + Math.round(parseFloat(this.price) * this.$store.state.priceCoeff * 100) / 100
      }
    }
  }
</script>

<style scoped>
.product {
  min-height: 300px;
  text-align: center;
  border-radius: 1em;
  background: #EEE;
  padding-top: 30px;
  padding-bottom: 30px;
}

.product .product__count {
  width: 3em;
  text-align: center;
}

.product .product__image {
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
