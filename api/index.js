import express from 'express'
const { Client } = require('pg');

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

// Some crutches for Postgres requests.
function pgContext(block) {
  return async (req, res) => {
    const pgClient = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })
    await pgClient.connect()
    block(req, res, pgClient)
  }
}

function pgQuery(pgClient, query, values, res, callback) {
  pgClient.query(query, values, async (err, pgRes) => {
    if (err) {
      console.log(err)
      return res.status(403).json({error: 'db query error'})
    }
    callback(pgRes)
    await pgClient.end()
  })
}



////////////
// ROUTES //
////////////

// Add GET - /api/products.json
router.get('/products.json', pgContext((req, res, pgClient) => {
  pgQuery(pgClient, 'SELECT * FROM products', [], res, (pgRes) => {
    res.json(pgRes.rows)
  })
}))

// Add GET - /api/orders.json
router.get('/orders.json', pgContext((req, res, pgClient) => {
  if (!req.session.authUser || !req.session.authUser.id) {
    return res.status(403).json({ error: 'You should sign in to get personal order history.' })
  }
  pgQuery(pgClient, 'SELECT * FROM orders WHERE user_id=$1', [req.session.authUser.id], res, (pgRes) => {
    res.json(pgRes.rows)
  })
}))

// Add POST - /api/login
router.post('/login', pgContext((req, res, pgClient) => {
  pgQuery(pgClient, 'SELECT * FROM users WHERE username=$1 AND password=$2;', [req.body.username, req.body.password], res, (pgRes) => {
    if (pgRes.rows[0]) {
      let username = pgRes.rows[0].username
      let id       = pgRes.rows[0].id
      req.session.authUser = { username: username, id: id }
      return res.json({ username: username, id: id })
    } else {
      res.status(401).json({ message: 'Bad credentials' })
    }
  })
}))

// Add POST - /api/register
router.post('/register', pgContext((req, res, pgClient) => {
  pgQuery(pgClient, 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username;', [req.body.username, req.body.password], res, (pgRes) => {
    if (pgRes.rows[0]) {
      let username = pgRes.rows[0].username
      let id       = pgRes.rows[0].id
      req.session.authUser = { username: username, id: id }
      return res.json({ username: username, id: id })
    } else {
      res.status(401).json({ message: 'Bad credentials' })
    }
  })
}))

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// Add POST - /api/send_order
router.post('/send_order', pgContext((req, res, pgClient) => {
  let userId = req.session.authUser && req.session.authUser.id ? req.session.authUser.id : 0
  pgQuery(
    pgClient,
    'INSERT INTO orders (name, surname, phone, address, cart, user_id, currency, delivery_cost, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);',
    [req.body.name, req.body.surname, req.body.phone, req.body.address, JSON.stringify(req.body.cart), userId, req.body.currency, req.body.deliveryCost, req.body.totalCost],
    res,
    (pgRes) => {
      return res.json({ status: 'ok' })
    })
  }
))


// Export the server middleware
export default {
  path: '/api',
  handler: router
}
