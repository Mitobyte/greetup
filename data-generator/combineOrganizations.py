import os
import json

# directory/folder path
dir_path = r'./data'
organizations = []

# Generate combined json file
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
        convertedEvents = []
        for event in events:
            convertedEvent = {}
            convertedEvent['name'] = event['name']
            convertedEvent['description'] = event['description']
            convertedEvent['startDate'] = event['startDate']
            convertedEvent['endDate'] = event['endDate']
            convertedEvent['url'] = event['url']

            # handle nested location in eventbrite
            if event.get('location') is None and event.get('address') is not None:
                convertedEvent['location'] = event['address']['location']
            else:
                convertedEvent['location'] = event['location']

            convertedEvents.append(convertedEvent)

        organization['events'] = convertedEvents

    organizations.append(organization)

with open(os.path.join('../web/src/data/combined.json'), 'w') as outfile:
    outfile.write(json.dumps(organizations, indent=4))
