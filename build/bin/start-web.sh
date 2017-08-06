#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG="v1-status-web-server"

$BASEDIR/_execute-scope-command.sh "$PKG" "../../build/bin/start-web.execute.sh $@"
