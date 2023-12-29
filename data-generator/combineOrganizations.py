import os
import json

# directory/folder path
meetup_path = r'./data/meetup'
eventbrite_path = r'./data/eventbrite'

paths = [meetup_path, eventbrite_path]
organizations = []

# Generate combined json file
for dir_path in paths:
    for file_path in os.listdir(dir_path):
        print("Processing: " + file_path + " " + dir_path)
        oFile = open(os.path.join(dir_path, file_path, 'organizations.json'), 'r')
        organization = json.load(oFile)
        organization = organization[0]

        if organization.get('name') is None and organization.get('title') is not None:
            organization['name'] = organization['title']

        f = open(os.path.join(dir_path, file_path, 'events.json'), 'r')
        events = json.load(f)

        if not events:
            organization['events'] = []
        else:
            organization['events'] = events

        organizations.append(organization)

with open(os.path.join('../web/src/data/combined.json'), 'w') as outfile:
    outfile.write(json.dumps(organizations, indent=4))