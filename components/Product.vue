<template>
  <div class="product">
    <div class="image" @click="toggler = !toggler" v-bind:style="{ backgroundImage: `url('${preview}')` }" title="Click to see full view"></div>
    <FsLightbox
      :toggler="toggler"
      :sources="[image]"
    />
    <hr />
    <h4 class="subtitle">{{ title }}<span v-if="calcedPrice">, {{ calcedPrice }}</span></h4>
    <div>
      <input type="button" value="-" @click="count = Math.max(1, count - 1)" v-bind:disabled="count<=1" v-bind:title="count > 1 ? 'Minus one' : 'Need one pizza more to use this button'" />
      <input class="count" v-model="count">
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
    name: 'product',
    props: ['title', 'image', 'preview', 'price', 'id'],
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

<style>
</style>
