#!/usr/bin/env bash

ssh suilabs@suilabs.com <<< "
cd Projects/hathsin
git pull origin master && \
docker-compose up --build -d"
