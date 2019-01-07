#! /bin/bash

if [ -z "$*" ]; then
    echo "Please supply a query you'd like to run"
    exit
fi

tail -f /usr/local/var/log/mongodb/mongo.log &

echo -e "use articles\n$(cat $1)" | mongo

trap 'kill $(jobs -p)' EXIT
