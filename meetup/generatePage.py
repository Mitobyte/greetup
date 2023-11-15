import os
import json

# directory/folder path
dir_path = r'../data/meetup'

def generatePage(organization):
    # Get the organization information from the first event in the JSON data
    organizationInfo = organization[0]['organizer']

    # Use the name of the first event as the title
    document_title = organization[0]['name']

    # Display the event name in the h1 tag
    newHtml = f'<h1>{document_title} Events</h1>'

    # Organization Information Section
    newHtml = newHtml + '<section id="organization-info">'
    newHtml = newHtml + f'<h2>{organizationInfo["name"]}</h2>'

    # Display the organization information on the page
    if 'description' in organizationInfo:
        newHtml = newHtml + f'<p>{organizationInfo["description"]}</p>'

    newHtml = newHtml + f'<p>For more information, you can visit their <a href="{organizationInfo["url"]}" target="_blank">website</a>.</p>'

    newHtml = newHtml + '</section>'

    # Event List Section
    newHtml = newHtml + '<section>'
    newHtml = newHtml + '<h2>Event List</h2>'

    # Loop through each event in the JSON data
    for event in organization:
        description = event["description"].replace("\\n", "<br/>")
        newHtml = newHtml + '<div>'
        newHtml = newHtml + f'<a href="{event["url"]}" target="_blank">{event["name"]}</a>'
        newHtml = newHtml + f'<p>{event["startDate"]}</p>'
        newHtml = newHtml + f'<p>{description}</p>'
        newHtml = newHtml + '</div>'

    newHtml = newHtml + '</ul>'
    newHtml = newHtml + '</section>'
    return newHtml


html_body = ''

# Generate combined json file
for file_path in os.listdir(dir_path):
    # # Gets the organizer for the meetup
    # f = open(os.path.join(dir_path, file_path, 'organizations.json'), 'r')
    # organizerData = json.load(f)
    # print(json.dumps(organizerData) + '\n')

    # Gets the events for the meetup
    f = open(os.path.join(dir_path, file_path, 'events.json'), 'r')
    data = json.load(f)

    # Gets the name of the meetup
    html_body += generatePage(data)
print(html_body)


# Opening our text file in read only
# mode using the open() function
with open(r'meetup/index-template.html', 'r') as file:

    # Reading the content of the file
    # using the read() function and storing
    # them in a new variable
    data = file.read()

    # Searching and replacing the text
    # using the replace() function
    data = data.replace('#BODY#', html_body)

# Opening our text file in write only
# mode to write the replaced content
with open(r'meetup/index.html', 'w') as file:

    # Writing the replaced data in our
    # text file
    file.write(data)