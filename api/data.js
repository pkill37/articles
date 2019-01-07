// build random data
const faker = require('faker')
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)
const data = []
for(let i = 1; i <= 10000; i++) {
    let obj = {
        title: capitalizeFirstLetter(faker.lorem.words()),
        text: faker.lorem.paragraph(),
        author: faker.name.findName(),
        image: `${i}.jpg`,
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    data.push(obj)
    console.log(obj)
}

// connect to mongo
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://localhost:27017/articles'
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
mongoose.connection.once('open', () => console.log('Connected to the database'))
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

// populate mongo
const schemas = require('./schemas')
const assert = require('assert')
let ArticleModel = mongoose.model('Article', schemas.ArticleSchema)
ArticleModel.collection.drop();
ArticleModel.collection.insertMany(data, (err,r) => {
    assert.equal(null, err)
    assert.equal(10000, r.insertedCount)
    mongoose.connection.close()
})
