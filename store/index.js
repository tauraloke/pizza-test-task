import axios from 'axios'

export const state = () => ({
  authUser: null,
  products: [],
  priceCoeff: 1,
  currentCurrency: '€',
  currencyChain: {'€': '$', '$': '€'},
  cart: {}
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  },

  SET_PRODUCTS (state, products) {
    state.products = products
  },

  UPDATE_CART (state, { id, product }) {
    if (!state.cart[id]) {
      state.cart[id] = product
    } else {
      state.cart[id].amount += parseInt(product.amount)
    }
  },

  REMOVE_FROM_CART (state, { id }) {
    delete state.cart[id]
  },

  DROP_CART (state) {
    state.cart = []
  },

  SET_CURRENCY (state, currency) {
    state.currentCurrency = currency
  },

  SET_PRICE_COEFF (state, coeff) {
    state.priceCoeff = coeff
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },

  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },

  async register ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/register', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      throw new Error('Cannot create new account. Please, try to change username in field above.')
    }
  },

  async getProducts({ commit }) {
      const {data} = await axios.get('/api/products.json')
      commit('SET_PRODUCTS', data)
  },

  updateCart({ commit }, data) {
    commit('UPDATE_CART', data)
  },

  removeFromCart({ commit }, data) {
    commit('REMOVE_FROM_CART', data)
  },

  dropCart({ commit }) {
    commit('DROP_CART')
  },

  switchCurrency({ commit }, { currency }) {
    let euroInDollars = 0.8928571429
    let newPriceCoeff = false
    if (currency == '$') {
      newPriceCoeff = euroInDollars
    }
    if (currency == '€') {
      newPriceCoeff = 1
    }
    if (newPriceCoeff !== false) {
      commit('SET_PRICE_COEFF', newPriceCoeff)
    }
    commit('SET_CURRENCY', currency)
  }
}
