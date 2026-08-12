import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

content = re.sub(r'border-gray-200/20', 'border-gray-200', content)
content = re.sub(r'border-gray-100/60', 'border-gray-200', content)
content = re.sub(r'bg-gray-200 text-black border-gray-200', 'bg-gray-100 text-black border-gray-200', content)
content = re.sub(r'hover:text-black hover:border-gray-200/20', 'hover:text-black hover:border-black', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
