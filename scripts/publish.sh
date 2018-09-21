#!/bin/sh
VERSION=$1
echo "Publishing $VERSION..."
git tag -a $VERSION -m "Tagged $VERSION"
npm publish
