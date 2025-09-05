#!/bin/bash

if [[ ! -d quartz ]]; then
    echo "Quartz dir not found, try to run \"make\" command"
    exit 1
fi

cd quartz && ./quartz/bootstrap-cli.mjs build --output ../dist
