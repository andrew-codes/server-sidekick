#!/bin/bash
set -e

export PATH="`npm bin`:$PATH"

if [[ $# -eq 0 || "$1" == "" ]]; then
    chalk --no-stdin -t "{red No scope provided.}"
    exit 1
fi

if [[ $# -eq 1 || "$1" == "" ]]; then
    chalk --no-stdin -t "{red No command provided.}"
    exit 1
fi

package=$1
command=$2

lerna exec --scope $package -- $command
