import os
import json
import markdown

# directory/folder path
dir_path = r'../data/meetup'

html_body = ''

def generatePage(organization):
    # Get the organization information from the first event in the JSON data
    organizationInfo = organization

    # Organization Information Section
    newHtml = (
        '<section id="organization-info">'
        f'<h1>{organizationInfo["name"]}</h1>'
    )

    # Display the organization information on the page
    if 'description' in organizationInfo:
        newHtml += f'<p>{organizationInfo["description"]}</p>'

    newHtml += (
        f'<p>'
        f'For more information, you can visit their <a href="{organizationInfo["url"]}" target="_blank">website</a>.'
        f'</p>'
        '</section>'
        '<section id="organization-events">'
        '<h2>Event List</h2>'
    )

    # Loop through each event in the JSON data
    for event in organization["events"]:
        description = markdown.markdown(event["description"])
        newHtml +=(
            '<div>'
            f'<a href="{event["url"]}" target="_blank">{event["name"]}</a>'
            f'<p>{event["startDate"]}</p>'
            f'<p>{description}</p>'
            '</div>'
        )

    newHtml += '</section>'
    return newHtml

# Generate combined json file
for file_path in os.listdir(dir_path):
    print("Processing: " + file_path + " " + dir_path)
    oFile = open(os.path.join(dir_path, file_path, 'organizations.json'), 'r')
    organization = json.load(oFile)

    f = open(os.path.join(dir_path, file_path, 'events.json'), 'r')
    events = json.load(f)

    organization['events'] = events

    html_body += generatePage(organization)
print(html_body)


# Opening our text file in read only
# mode using the open() function
with open(r'index-template.html', 'r') as file:

    # Reading the content of the file
    # using the read() function and storing
    # them in a new variable
    data = file.read()

    # Searching and replacing the text
    # using the replace() function
    data = data.replace('#BODY#', html_body)

# Opening our text file in write only
# mode to write the replaced content
with open(r'index.html', 'w') as file:
    # Writing the replaced data in our
    # text file
    file.write(data)