#!/bin/bash

docker run -v $PWD:/greetup greetup:latest bash /greetup/meetup/fetch_and_store.sh