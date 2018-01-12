#! /bin/bash
NAME=mckernanin/elections-react
TAG=$(git log -1 --pretty=%h)
IMG=$NAME:$TAG
LATEST=$NAME:latest
docker build -t $IMG .
docker tag $IMG $LATEST
