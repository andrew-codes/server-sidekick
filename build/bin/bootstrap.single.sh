#!/bin/bash
set -e

export PATH="`npm bin`:$PATH"

if [[ $# -eq 0 || "$1" == "" ]]
  then
    chalk --no-stdin -t "{red No scope given}"
    exit 1
fi

PKG="$1"

shift || true

chalk --no-stdin -t "{blue Cleaning package(s) for bootstrapping}"
lerna exec --scope "$PKG" $@ -- git clean -Xdf .

chalk --no-stdin -t "{blue Bootstrapping package $PKG}"
lerna bootstrap --scope "$PKG" $@
