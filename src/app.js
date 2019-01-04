const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// if app is running on your machine, use your version of .env
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

////////////////////////// ROUTES //////////////////////////

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))
app.use('/posts/:post_id/comments', require('./routes/comments'))
app.use('/posts/:post_id/ratings', require('./routes/ratings'))


////////////////////////// DEFAULT ROUTES //////////////////////////

app.use(function(req, res, next) {
  next({status: 404, message: 'Route Not Found'})
})

////////////////////////// ERROR HANDLING //////////////////////////

app.use((err, _req, res, _next)=> {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  res.status(status).json({message, status})
})

////////////////////////// INTIALIZE SERVER //////////////////////////

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Howdy from ', port)
})

