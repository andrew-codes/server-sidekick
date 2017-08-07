#!/bin/bash
set -e

export PATH="`npm bin`:$PATH"

lerna exec -- npm test
