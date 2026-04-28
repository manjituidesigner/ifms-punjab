import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace local links with absolute live URLs
content = content.replace('href="./docs/', 'href="https://ifms.punjab.gov.in/docs/')

# Replace the caret icons with download icons
content = content.replace('bi-caret-right-fill', 'bi-download')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
