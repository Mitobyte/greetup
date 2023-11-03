#!/bin/bash

mkdir -p "/greetup/data/meetup"

while IFS= read -r line; do
	# Split the line by comma and assign to two variables
    IFS=',' read -r name url <<< "$line"


    mkdir -p "/greetup/data/meetup/$name"

	response=$(curl -s $url)
	script_tags=$(echo $response | hq '{scripts: script[type="application/ld+json"]  | [@text]}')
	organizations=$(echo $script_tags | xq '.scripts[]  | fromjson | select(type == "object" and .["@type"]=="Organization")')
	events=$(echo $script_tags | xq '.scripts[]  | fromjson | select(type == "array")')

	echo $organizations > "/greetup/data/meetup/$name/organizations.json"
	echo $events > "/greetup/data/meetup/$name/events.json"

done	
