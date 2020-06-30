import express from 'express'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/products.json', (req, res) => {
  let data = [
    { title: 'Banana pizza', image: './images/98a6fe7ef0ba426ba4e85c2b7d59c198.jpg', preview: './images/preview/1.jpg', 'price': 1.10},
    { title: 'Lobster wheel', image: './images/1200x630.jpg', preview: './images/preview/2.jpg', 'price': 1.20},
    { title: 'Corndog pizza', image: './images/corndog-pizza.jpg', preview: './images/preview/3.jpg', 'price': 1.30},
    { title: 'Peas pizza', image: './images/img_1265.jpeg', preview: './images/preview/4.jpg', 'price': 1.30},
    { title: 'Wide mouth checker', image: './images/McDonalds-Pizza.jpg', preview: './images/preview/5.jpg', 'price': 1.30},
    { title: 'Everything is a pizza if you brave enough', image: './images/new2-marg.jpg', preview: './images/preview/6.jpg', 'price': 1.30},
    { title: 'Candy pizza', image: './images/pizza-thumb-1.jpg', preview: './images/preview/7.jpg', 'price': 1.30},
    { title: 'Pizza with third eye', image: './images/pizza-toppings-eggs1.jpg', preview: './images/preview/8.jpg', 'price': 1.30},
    { title: 'Corn pizza', image: './images/corndog-pizza.jpg', preview: './images/preview/9.jpg', 'price': 1.30}
  ]
  res.json(data)
})


// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
