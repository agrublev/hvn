#!/usr/bin/env bash

if [ -f package.json5 ]; then
    json5 package.json5 > package.json
fi


node ./update.js

if [ $1 = "run" ]; then
    echo "TEST"
    npx ntl
    exit 1
else
    if [ $1 = "init" ]; then
        echo "no"
    else
        mv ./package.json ./.packageJsonBack
    fi
fi

yarn $@




#echo "$@"
#cp ./copy.json ./test.json
#sleep 1
#echo $(ls)
#sleep 1