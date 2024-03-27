#!/bin/bash

docker run -v $PWD:/app greetup:latest bash /app/groups/fetch_and_store.sh