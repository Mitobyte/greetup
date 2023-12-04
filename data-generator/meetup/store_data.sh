#!/bin/bash

mkdir -p "../data/meetup"

while IFS= read -r line; do
	# Split the line by comma and assign to two variables
    IFS=',' read -r name url <<< "$line"


  mkdir -p "../data/meetup/$name"

	response=$(curl -s $url)
	script_tags=$(echo $response | hq '{scripts: script[type="application/ld+json"]  | [@text]}')
	organizations=$(echo $script_tags | xq '[.scripts[]  | fromjson | select(type == "object" and .["@type"]=="Organization" and .["name"]!="Meetup")]')
	events=$(echo $script_tags | xq '.scripts[]  | fromjson | select(type == "array")')

	echo $organizations > "../data/meetup/$name/organizations.json"
	echo $events > "../data/meetup/$name/events.json"

done	
