#!/usr/bin/env bash

PROJECT_NAME=hathsinV2
ssh -tt -o StrictHostKeyChecking=no suilabs@suilabs.com <<< "mkdir -p Projects/${PROJECT_NAME}; exit" && \
rsync -rpulz --verbose ${PWD}/../* suilabs@suilabs.com:./Projects/${PROJECT_NAME}/. && \
export LC_PROJECT_NAME=${PROJECT_NAME} && \
ssh -tt -o SendEnv=PROJECT_NAME -o StrictHostKeyChecking=no suilabs@suilabs.com <<< "
cd Projects/${LC_PROJECT_NAME}
docker-compose up -d hathsin-database && \
docker-compose up -d --build hathsin;
exit 0"
