import os
import json

# directory/folder path
dir_path = r'./data/meetup'

organizations = []

# Generate combined json file
for file_path in os.listdir(dir_path):
    print("Processing: " + file_path + " " + dir_path)
    oFile = open(os.path.join(dir_path, file_path, 'organizations.json'), 'r')
    organization = json.load(oFile)
    organization = organization[0]

    f = open(os.path.join(dir_path, file_path, 'events.json'), 'r')
    events = json.load(f)

    organization['events'] = events

    organizations.append(organization)

with open(os.path.join('../web/src/data/combined.json'), 'w') as outfile:
    outfile.write(json.dumps(organizations, indent=4))