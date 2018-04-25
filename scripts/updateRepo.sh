#!/usr/bin/env bash

ssh -T suilabs@suilabs.com <<< "
cd Projects/hathsin
git reset --hard origin/HEAD && \
docker-compose build --no-cache && \
docker-compose up -d"
