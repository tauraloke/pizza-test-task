import axios from 'axios'

export const state = () => ({
  authUser: null,
  products: [],
  priceCoeff: 1,
  currentCurrency: '€'
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  },
  SET_PRODUCTS (state, products) {
    state.products = products
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
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async getProducts({ commit }) {
      const {data} = await axios.get('/api/products.json')
      commit('SET_PRODUCTS', data)
  }
}
