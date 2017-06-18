#!/usr/bin/env bash

set -e

export PATH="`yarn bin`:$PATH"
NODE_MODULES=`npm root`

chalk --no-stdin -t "{blue Linting files…}"
eslint --color --format "$NODE_MODULES/eslint-friendly-formatter" . --ext .js $@
