#!/usr/bin/env bash

set -e

BASEDIR=$(dirname $0)
PKG="@andrew-codes/reference-native-app"

$BASEDIR/_execute-scope-command.sh "$PKG" "../../build/bin/start-native.execute.sh $@"
