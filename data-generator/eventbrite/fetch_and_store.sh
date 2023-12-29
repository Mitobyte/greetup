#!/bin/bash

# dev mode
#cat /app/eventbrite/groups.csv | /app/eventbrite/store_data.sh

cat ./groups.csv | ./store_data.sh
