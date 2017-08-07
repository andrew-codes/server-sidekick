#!/bin/bash
set -e

pushd ../.. > /dev/null
export PATH="`npm bin`:$PATH"
popd > /dev/null

NODE_ENV=development
chalk --no-stdin -t "{blue Running Dev Web App}"
nodemon src/webServer/index.js
