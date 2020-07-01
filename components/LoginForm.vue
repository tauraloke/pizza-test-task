<template>
  <div>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <input v-model="formUsername" name="login" type="text" placeholder="login" />
      <input v-model="formPassword" name="pass" type="password" placeholder="pass" />
      <input name="submit" type="submit" value="Sign in" />
    </form>
    <div v-if="$store.state.authUser" class="userblock">
      <span>{{ $store.state.authUser.username }}/{{ $store.state.authUser.id }}</span>
      <a @click="logout">Logout</a>
    </div>
    <div class="error">{{ formError }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style scoped>
.userblock span {
  font-weight: bold;
}

.userblock a {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}

.error {
  color: red;
}
</style>
