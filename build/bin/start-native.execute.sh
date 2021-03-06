#!/bin/bash
set -e

pushd ../.. > /dev/null
export PATH="`npm bin`:$PATH"
popd > /dev/null

chalk --no-stdin -t "{blue Running Native App via Simulator}"
react-native run-$1
