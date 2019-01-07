# articles

A demo of MongoDB and the MapReduce programming model on a dummy articles dataset.

## Client

1. Install dependencies:

    ```
    cd client/
    npm install
    ```

2. Run the development HTTP server:

    ```
    npm start
    ```

## Server

1. Install Node dependencies:

    ```
    cd server/
    npm install
    ```

2. Populate the `articles` collection with 10k randomly generated articles:

    ```
    node data.js
    cd public/
    ./download.sh
    ```

3. Run the development HTTP server:

    ```
    node server.js
    ```

4. Use the HTTP endpoints:

    ```
    curl http://localhost:3001/articles
    ```

    ```
    curl --header "Content-Type: application/json" \
        --request POST \
        --data '{ "text": "hey there" }' \
        http://localhost:3001/articles/5c32bb4e5e1adb436d8fa140/comments
    ```
