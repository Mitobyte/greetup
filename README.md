# Greetup
This project is meant to be a starter for aggregating various event platforms.

This data can then be used to generate a static site with a calendar, and local event listings.

## How it works:

1. Each source (such as meetup.com) gets a directory which stores:
	1. A csv file to store names / URLs of groups.
	2. A script called fetch_and_store.sh.
	3. Any other supporting scripts.

2. The build_docker.sh script
	1. Builds a docker container with the necessary tools installed.
	2. This container is used to run the fetch_and_store.sh script.

2. The collect_data.sh script
	1. Runs a docker container with html and json parsers installed. (hq and xq).
	2. Fetches data, parses, and puts it in the `data` directory.

3. The generate_site.sh script
	1. Reads the data directory and generates a static site.

## Libraries
hq: https://github.com/orf/hq

xq: https://github.com/MiSawa/xq
