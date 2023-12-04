#!/bin/bash

python3 combineOrganizations.py
mkdir ../data
mv ./data/meetup/combined.json ../data/
