#!/bin/bash

mkdir -p "/app/data/eventbrite"

while IFS= read -r line; do
	# Split the line by comma and assign to two variables
  IFS=',' read -r name url <<< "$line"

  mkdir -p "/app/data/eventbrite/$name"

	response=$(curl -s $url)
	script_tags=$(echo $response | hq '{scripts: script[type="application/ld+json"]  | [@text]}')
	attr_tags=[$(echo $response | hq '{title: meta[property="og:title"]  | @(content)}'),
	attr_tags+=$(echo $response | hq '{description: meta[property="og:description"]  | @(content)}'),
	attr_tags+=$(echo $response | hq '{url: meta[property="og:url"] | @(content)}')]
	organizations=$(echo $attr_tags | xq 'add | [.]')
	events=$(echo $script_tags | xq '.scripts[] | [fromjson] ')

  echo $organizations > "/app/data/eventbrite/$name/organizations.json"
	echo $events > "/app/data/eventbrite/$name/events.json"

done	
