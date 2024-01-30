#!/bin/bash

if [ "$DATA_ENV" = 'production' ]; then
    # production mode
    export DATA_DIR="../data/eventbrite/"
  else
    # dev mode
    export DATA_DIR="/app/data/eventbrite"
fi

mkdir -p "$DATA_DIR"

while IFS= read -r line; do
	# Split the line by comma and assign to two variables
  IFS=',' read -r name url <<< "$line"

  mkdir -p "$DATA_DIR/$name"

	response=$(curl -s $url)
	script_tags=$(echo $response | hq '{scripts: script[type="application/ld+json"]  | [@text]}')
	attr_tags=[$(echo $response | hq '{title: meta[property="og:title"]  | @(content)}'),
	attr_tags+=$(echo $response | hq '{description: meta[property="og:description"]  | @(content)}'),
	attr_tags+=$(echo $response | hq '{image: meta[property="og:image"]  | @(content)}'),
	attr_tags+=$(echo $response | hq '{url: meta[property="og:url"] | @(content)}')]
	organizations=$(echo $attr_tags | xq 'add | [.]')

	events=$(echo $script_tags | xq '.scripts[] | fromjson | select(type == "array")')
  isEmpty=$([ -z "$events" ] && echo "Empty" || echo "Not empty")
  if [ "$isEmpty" = 'Empty' ]; then
    echo "No events found for $name"
    echo "[]" > "$DATA_DIR/$name/events.json"
  else
    echo $events > "$DATA_DIR/$name/events.json"
  fi

  echo $organizations > "$DATA_DIR/$name/organizations.json"

done
