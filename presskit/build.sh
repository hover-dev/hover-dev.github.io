#!/bin/bash

echo "Update"
npm update -g presskit

echo "Build"
BASEDIR=$(dirname $0)
cd "${BASEDIR}" && presskit build

echo "Move"
cp -vr "${BASEDIR}/build"/* "${BASEDIR}/.."
rm -vrf "${BASEDIR}/build"/*
