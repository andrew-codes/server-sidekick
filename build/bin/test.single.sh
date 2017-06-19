#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"
shift || true

$BASEDIR/_execute-scope-command.sh "$PKG" "../../build/bin/test.single.execute.sh $@"
