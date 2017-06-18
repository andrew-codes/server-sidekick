#!/usr/bin/env bash

set -e

export PATH="`yarn bin`:$PATH"

chalk --no-stdin -t "{blue Cleaning all packages for bootstrapping}"
lerna exec -- git clean -Xdf .

chalk --no-stdin -t "{blue Bootstrapping all packages}"
lerna bootstrap
