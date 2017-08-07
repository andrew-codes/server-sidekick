#!/bin/bash
set -e

pushd ../.. > /dev/null
export PATH="`npm bin`:$PATH"
popd > /dev/null

chalk --no-stdin -t "{blue Running API App}"
dotnet run
