#!/usr/bin/env bash
set -e

export PATH="`yarn bin`:$PATH"

lerna exec -- yarn test
