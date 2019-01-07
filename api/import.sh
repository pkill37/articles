#! /bin/bash

# Wipe collection
echo -e "use articles\ndb.dropDatabase()" | mongo

# Generate data
node data.js

# Import data
mongoimport -d articles -c articles --jsonArray --file data.json
