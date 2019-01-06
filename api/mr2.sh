#! /bin/bash

MR=`cat mr2.js`
echo -e "use articles\n\n$MR" | mongo
