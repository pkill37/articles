const express = require('express')
const app = express()

// connect to mongo
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://localhost:27017/articles'
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
mongoose.connection.once('open', () => console.log('Connected to the database'))
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

// parse the request body to be a readable json format
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// build models
const schemas = require('./schemas')
let ArticleModel = mongoose.model('Article', schemas.ArticleSchema)
let CommentModel = mongoose.model('Comment', schemas.CommentSchema)

// get top 10 articles
app.get('/articles', (req, res) => {
  ArticleModel.find().sort({_id:1}).limit(10).exec((err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, data: data })
  })
})

// get an article's comments
app.post('/articles/:articleId/comments', (req, res) => {
  const comment = new CommentModel({ text: req.body.text })

  ArticleModel.findOneAndUpdate(
    { '_id': req.params.articleId },
    { $push: { comments: comment } },
    { 'upsert': false, 'new': true },
    (err, doc) => {
      if (err) return res.json({ success: false, error: err.message })
      return res.json({ success: true, data: doc })
    }
  )
})

// bind the server to a port and run it
const API_PORT = 3001
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))
