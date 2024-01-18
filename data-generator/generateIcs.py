import os
import json
import ics
from ics import Calendar, Event

dir_path = r'../web/src/data'

organizations = json.load(open(os.path.join(dir_path, 'combined.json'), 'r'))

c = Calendar()
for organization in organizations:
    for event in organization['events']:
        e = Event()
        e.name = event['name']
        e.description = event['description']
        e.begin = event['startDate']
        e.end = event['endDate']

        if event.get('location') is not None:
            location = event['location']
            if location.get('name') is not None:
                e.location = location['name']

            if location.get('address') is not None and location['address'].get('streetAddress') is not None:
                if location['address'].get('postalCode') is not None:
                    postal_code = location['address']['postalCode']
                else:
                    postal_code =''

                e.location += ', {0}, {1} {2}, {3}'.format(
                    location['address']['streetAddress'],
                    location['address']['addressLocality'],
                    location['address']['addressRegion'],
                    postal_code,
                )

        c.events.add(e)

with open(os.path.join(dir_path, 'mke_tech_events.ics'), 'w') as my_file:
    my_file.writelines(c.serialize_iter())

