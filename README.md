# Greetup
This project is meant to be a starter for aggregating various

## How it works:

1. Each source (such as meetup.com) gets a directory which stores:
	1. A csv file to store names / URLs of groups.
	2. A script called fetch_and_store.sh.
	3. Any other supporting scripts.
	
2. The collect_data.sh script
	1. Runs a docker container with html and json parsers installed. (hq and xq).
	2. Fetches data, parses, and puts it in the `data` directory.


## Libraries
hq: https://github.com/orf/hq
xq: https://github.com/MiSawa/xq
