#!/bin/bash
set -e

BASEDIR=$(dirname $0)
PKG="ServerStatus"

$BASEDIR/_execute-scope-command.sh "$PKG" "../../build/bin/restore-api.execute.sh $@"
