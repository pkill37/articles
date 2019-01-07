# articles

## Client

Run the client application

```
npm start
```

## Server

Populate the `articles` collection with 10k randomly generated articles.

```
node data.js
```

Run the HTTP server:

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
