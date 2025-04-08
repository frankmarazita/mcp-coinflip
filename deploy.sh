#!/usr/bin/env bash

set -eu -o pipefail

source .env

REPO_URL="$(git config --get remote.origin.url)"
REPO_USER=$(echo "$REPO_URL" | sed -E 's/.*[:\/]([^\/]+)\/.*/\1/')
REPO_NAME=$(echo "$REPO_URL" | sed -E 's/.*[:\/]([^\/]+)\/(.*)\.git/\2/')

echo $GITHUB_TOKEN | docker login ghcr.io -u $REPO_USER --password-stdin

IMAGE_URL="ghcr.io/$REPO_USER/$REPO_NAME:latest"

docker pull $IMAGE_URL

docker compose up -d --remove-orphans

docker images -q $IMAGE_URL | grep -v $(docker images -q $IMAGE_URL) | xargs -r docker rmi
