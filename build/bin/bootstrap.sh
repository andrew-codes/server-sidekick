#!/bin/bash
set -e

export PATH="`npm bin`:$PATH"

chalk --no-stdin -t "{blue Cleaning all packages for bootstrapping}"
lerna exec -- git clean -Xdf .

chalk --no-stdin -t "{blue Bootstrapping all packages}"
lerna bootstrap
