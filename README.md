# articles

A demo of MongoDB and the MapReduce programming model on a dummy articles dataset.

## Client

Install dependencies:

```
npm install
```

Run the development HTTP server:

```
npm start
```

## Server

Install Node dependencies:

```
npm install
```

Populate the `articles` collection with 10k randomly generated articles:

```
node data.js
```

Run the development HTTP server:

```
node server.js
```

Use the HTTP endpoints:

```
curl http://localhost:3001/articles
```

```
curl --header "Content-Type: application/json" \
    --request POST \
    --data '{ "text": "hey there" }' \
    http://localhost:3001/articles/5c32bb4e5e1adb436d8fa140/comments
```
