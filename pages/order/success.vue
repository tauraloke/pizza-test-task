<template>
  <section class="container">
    <h4 class="title">Thank you!</h4>
    <div>
      <p>We have remembered your order.</p>
      <p>(Of course we will not send it, because this site is only test one.)</p>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'success_message',
    data () {
      return {
      }
    }
  }
</script>

<style scoped>

</style>
