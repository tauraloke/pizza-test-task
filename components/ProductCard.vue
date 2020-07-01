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
      <input type="button" value="-" @click="count = Math.max(1, count - 1)" />
      <input class="count" v-model="count">
      <input type="button" value="+" @click="count = count + 1" />
      <input type="submit" value="Add to cart" />
    </div>
  </div>
</template>


<script>
  export default {
    components: {
      FsLightbox: () => import('fslightbox-vue')
    },
    name: 'product',
    props: ['title', 'image', 'preview', 'price'],
    data () {
      return {
        toggler: false,
        count: 1
      }
    },
    methods: {
    },
    computed: {
      calcedPrice: function () {
        return this.$store.state.currentCurrency + '' + parseFloat(this.price) * this.$store.state.priceCoeff
      }
    }
  }
</script>

<style>
</style>
