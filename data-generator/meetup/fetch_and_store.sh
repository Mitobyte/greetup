#!/bin/bash

if [ "$DATA_ENV" = 'production' ]; then
  # production mode
    cat ./groups.csv | ./store_data.sh
  else
    # dev mode
    cat /app/meetup/groups.csv | /app/meetup/store_data.sh
fi


