import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

content = re.sub(r'bg-tata-grey/30', 'bg-gray-300', content)
content = re.sub(r'bg-tata-grey-light/80', 'bg-gray-200', content)
content = re.sub(r'border-tata-cyan', 'border-black', content)
content = re.sub(r'via-tata-dark/20', 'via-black/20', content)
content = re.sub(r'ring-tata-blue-dark', 'ring-black', content)
content = re.sub(r'bg-tata-grey', 'bg-gray-300', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
