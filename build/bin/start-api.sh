#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG="ServerStatus"

$BASEDIR/_execute-scope-command.sh "$PKG" "../../build/bin/start-api.execute.sh $@"
