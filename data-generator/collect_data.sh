#!/bin/bash

#docker run -v $PWD:/app greetup:latest bash /app/meetup/fetch_and_store.sh
docker run -v $PWD:/app greetup:latest bash /app/eventbrite/fetch_and_store.sh