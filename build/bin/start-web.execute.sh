#!/bin/bash
set -e

pushd ../.. > /dev/null
export PATH="`npm bin`:$PATH"
popd > /dev/null

NODE_ENV=development
chalk --no-stdin -t "{blue Running Web App}"
nodemon src/webServer/index.js
