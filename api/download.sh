#! /bin/bash

rm -rf images && mkdir images

for i in `seq 1 10000`; do
    curl -L http://lorempixel.com/640/480 > "images/$i.jpg"
done
