#!/bin/bash
set -e

pushd ../.. > /dev/null
export PATH="`npm bin`:$PATH"
popd > /dev/null

chalk --no-stdin -t "{blue Native App}"
npm run haul -- --platform $1 &
react-native run-$1
