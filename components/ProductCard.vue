<template>
  <div class="product">
    <h4 class="subtitle">{{ title }}</h4>
  </div>
</template>

<style>
</style>


<script>
  export default {
    name: 'product',
    props: ['title'],
    data () {
      return {
        description: 'A product card.'
      }
    },
    metaInfo () {
      return {
        title: this.title,
        meta: [
          { vmid: 'description', name: 'description', content: this.description }
        ]
      }
    }
  }
</script>
