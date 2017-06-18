#!/usr/bin/env bash

set -e

pushd ../.. > /dev/null
export PATH="`yarn bin`:$PATH"
popd > /dev/null

jest --coverage -c .jestrc.json
