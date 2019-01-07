const fs = require('fs')
const faker = require('faker')
const request = require('request')
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const data = []
for(let i = 0; i < 10000; i++) {
    let obj = {
        title: capitalizeFirstLetter(faker.lorem.words()),
        text: faker.lorem.paragraph(),
        author: faker.name.findName(),
        image: `${i}.jpeg`,
        comments: []
    }

    data.push(obj)
    console.log(obj)
}

const str = '[' + data.map(d => JSON.stringify(d)) + ']'
fs.writeFile('data.json', str, (err) => { if (err) throw err; })
