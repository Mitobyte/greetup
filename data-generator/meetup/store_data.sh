#!/bin/bash

if [ "$DATA_ENV" = 'production' ]; then
    # production mode
    export DATA_DIR=../data/meetup/
  else
    # dev mode
    export 'DATA_DIR'='/app/data/meetup'
fi

mkdir -p $DATA_DIR

while IFS= read -r line; do
	# Split the line by comma and assign to two variables
    IFS=',' read -r name url <<< "$line"


  mkdir -p "$DATA_DIR/$name"

	response=$(curl -s $url)
	script_tags=$(echo $response | hq '{scripts: script[type="application/ld+json"]  | [@text]}')
	organizations=$(echo $script_tags | xq '[.scripts[]  | fromjson | select(type == "object" and .["@type"]=="Organization" and .["name"]!="Meetup")]')
	events=$(echo $script_tags | xq '.scripts[]  | fromjson | select(type == "array")')

	echo $organizations > "$DATA_DIR/$name/organizations.json"
	echo $events > "$DATA_DIR/$name/events.json"
done
