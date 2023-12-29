#!/bin/bash

# dev mode
#mkdir -p "/app/data/eventbrite"
mkdir -p "../data/eventbrite"

while IFS= read -r line; do
	# Split the line by comma and assign to two variables
  IFS=',' read -r name url <<< "$line"

# dev mode
#  mkdir -p "/app/data/eventbrite/$name"
  mkdir -p "../data/eventbrite/$name"

	response=$(curl -s $url)
	script_tags=$(echo $response | hq '{scripts: script[type="application/ld+json"]  | [@text]}')
	attr_tags=[$(echo $response | hq '{title: meta[property="og:title"]  | @(content)}'),
	attr_tags+=$(echo $response | hq '{description: meta[property="og:description"]  | @(content)}'),
	attr_tags+=$(echo $response | hq '{image: meta[property="og:image"]  | @(content)}'),
	attr_tags+=$(echo $response | hq '{url: meta[property="og:url"] | @(content)}')]
	organizations=$(echo $attr_tags | xq 'add | [.]')
	events=$(echo $script_tags | xq '.scripts[] | [fromjson] ')

  echo $organizations > "../data/eventbrite/$name/organizations.json"
	echo $events > "../data/eventbrite/$name/events.json"

done	
