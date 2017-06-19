#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG="v1-mobile"

$BASEDIR/_execute-scope-command.sh "$PKG" "../../build/bin/start-native.execute.sh $@"
