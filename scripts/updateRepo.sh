#!/usr/bin/env bash

ssh -tt -o StrictHostKeyChecking=no suilabs@suilabs.com <<< "
cd Projects/hathsinV2
git fetch && \
git reset --hard origin/HEAD && \
docker-compose up -d --build;
exit"
