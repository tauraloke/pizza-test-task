<template>
  <section>

    <b-navbar type="is-light">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          🍕 Pizza shop
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/cart' }">
          🛒 My cart
        </b-navbar-item>

        <b-navbar-item v-if="$store.state.authUser" tag="router-link" :to="{ path: '/order/history' }">
          📚 My orders
        </b-navbar-item>

        <b-navbar-item @click="changeCurrency(nextCurrency)">
          💱 Change display currency to {{nextCurrency }}
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item @click="isLoginModalActive = true" v-if="!$store.state.authUser">Sign in</b-navbar-item>
        <b-navbar-item @click="isRegisterModalActive = true" v-if="!$store.state.authUser">Sign up</b-navbar-item>
        <b-navbar-item v-if="$store.state.authUser">{{ $store.state.authUser.username }}</b-navbar-item>
        <b-navbar-item @click="logout" v-if="$store.state.authUser">Logout</b-navbar-item>
      </template>
    </b-navbar>

        <b-modal :active.sync="isLoginModalActive" :width="230" scroll="keep">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Login</p>
            </header>
            <form @submit.prevent="login">
              <section class="modal-card-body">
                <b-field label="Username">
                  <b-input
                    type="login"
                    v-model="formUsername"
                    placeholder="Your login"
                    required>
                  </b-input>
                </b-field>
                <b-field label="Password">
                  <b-input
                    type="password"
                    v-model="formPassword"
                    placeholder="Your password"
                    password-reveal
                    required>
                  </b-input>
                </b-field>
                <div class="error">{{ formError }}</div>
                <footer class="modal-card-foot">
                  <button class="button" type="button" @click="isLoginModalActive = false">Close</button>
                  <input name="submit" type="submit"  class="button is-primary" value="Sign in" />
                </footer>
              </section>
            </form>
          </div>
        </b-modal>


        <b-modal :active.sync="isRegisterModalActive" :width="230" scroll="keep">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Login</p>
            </header>
            <form @submit.prevent="register">
              <section class="modal-card-body">
                <b-field label="Username">
                  <b-input
                    type="login"
                    v-model="formUsername"
                    placeholder="Your login"
                    required>
                  </b-input>
                </b-field>
                <b-field label="Password">
                  <b-input
                    type="password"
                    v-model="formPassword"
                    placeholder="Your password"
                    password-reveal
                    required>
                  </b-input>
                </b-field>
                <b-field label="Confirm password">
                  <b-input
                    type="password"
                    v-model="formConfirmPassword"
                    placeholder="Confirm password"
                    password-reveal
                    required>
                  </b-input>
                </b-field>
                <div class="error">{{ formError }}</div>
                <footer class="modal-card-foot">
                  <button class="button" type="button" @click="isRegisterModalActive = false">Close</button>
                  <input name="submit" type="submit"  class="button is-primary" value="Sign in" />
                </footer>
              </section>
            </form>
          </div>
        </b-modal>

  </section>
</template>

<script>


export default {
  components: {
  },
  data () {
    return {
      formError: null,
      formUsername: '',
      formPassword: '',
      formConfirmPassword: '',
      isLoginModalActive: false,
      isRegisterModalActive: false,
      currencyShouldBeUpdated: 0,
    }
  },
  computed: {
    nextCurrency: function() {
      return this.$store.state.currencyChain[this.$store.state.currentCurrency]
    }
  },
  methods: {
    changeCurrency(currency) {
      this.$store.dispatch('switchCurrency', {currency: currency})
      this.$buefy.notification.open({message: 'The currency has been changed.', position: 'is-bottom-right'})
    },
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
        this.isLoginModalActive = false
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
    },
    async register () {
        if (this.formConfirmPassword != this.formPassword) {
          this.formError = 'Passwords are not identical'
          return
        }
        try {
          await this.$store.dispatch('register', {
            username: this.formUsername,
            password: this.formPassword
          })
          this.formUsername = ''
          this.formPassword = ''
          this.formError = null
          this.isRegisterModalActive = false
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
