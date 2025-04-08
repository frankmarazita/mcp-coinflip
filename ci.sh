#!/usr/bin/env bash

set -eu -o pipefail

git pull

./deploy.sh
