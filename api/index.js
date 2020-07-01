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

function pgQuery(pgClient, query, values, callback) {
  pgClient.query(query, values, async (err, pgRes) => {
    if (err) {
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
  pgQuery(pgClient, 'SELECT * FROM products', [], (pgRes) => {
    res.json(pgRes.rows)
  })
}))

// Add POST - /api/login
router.post('/login', pgContext((req, res, pgClient) => {
  pgQuery(pgClient, 'SELECT * FROM users WHERE username=$1 AND password=$2;', [req.body.username, req.body.password], (pgRes) => {
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
  pgQuery(pgClient, 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username;', [req.body.username, req.body.password], (pgRes) => {
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

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
