#!/bin/bash

# dev mode
#cat /app/eventbrite/groups.csv | /app/eventbrite/store_data.sh

cat ./eventbrite/groups.csv | ./eventbrite/store_data.sh
