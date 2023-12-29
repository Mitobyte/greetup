#!/bin/bash

# dev mode
#cat /app/meetup/meetups.csv | /app/meetup/store_data.sh

cat ./meetup/meetups.csv | ./meetup/store_data.sh

