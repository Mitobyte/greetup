#!/bin/bash

if [ "$DATA_ENV" = 'production' ]; then
  # production mode
    cat ./groups.csv | ./store_data.sh
  else
    # dev mode
    cat /app/groups/groups.csv | /app/groups/store_data.sh
fi
