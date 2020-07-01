<template>
  <div class="product">
    <h4 class="subtitle">{{ title }}</h4>
    <img :src="preview" @click="toggler = !toggler" class="image" title="Click to see full image" />
    <FsLightbox
      :toggler="toggler"
      :sources="[image]"
    />
  </div>
</template>


<script>
  export default {
    components: {
      FsLightbox: () => import('fslightbox-vue')
    },
    name: 'product',
    props: ['title', 'image', 'preview'],
    data () {
      return {
        toggler: false
      }
    },
    methods: {
    }
  }
</script>

<style>
  .image {
    cursor: pointer;
  }

  .product {
    border: 1px solid gray;
    border-radius: 1em;
  }
</style>
