#!/usr/bin/env bash

set -e

pushd ../.. > /dev/null
export PATH="`yarn bin`:$PATH"
popd > /dev/null

chalk --no-stdin -t "{blue Running Dev Web App}"
babel-node src/webServer/index.js
