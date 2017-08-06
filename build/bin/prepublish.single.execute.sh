#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
export PATH="`npm bin`:$PATH"
popd > /dev/null

config="$1"
if [[ $# -eq 0 || "$1" == "" ]]
  then
    config="production"
fi

chalk --no-stdin -t "{blue Generating CommonJS bundle...}"
webpack --config ../../build/webpack/$config.js $@
