#!/bin/bash
set -e

BASEDIR=$(dirname $0)
PKG="v1-mobile"

$BASEDIR/_execute-scope-command.sh "$PKG" "../../build/bin/build-native-run.execute.sh $@"
