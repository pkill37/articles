#! /bin/bash

tail -f /usr/local/var/log/mongodb/mongo.log &

echo -e "use articles\n$(cat mr2.js)" | mongo

trap 'kill $(jobs -p)' EXIT
