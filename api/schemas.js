const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
  {
    text: String
  },
  {
    timestamps: true
  }
)

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    author: String,
    image: String,
    comments: [CommentSchema]
  },
  {
    timestamps: true
  }
)

module.exports = { ArticleSchema, CommentSchema }
