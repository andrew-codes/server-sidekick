#!/usr/bin/env bash

export PATH="`yarn bin`:$PATH"

lerna exec -- yarn test
