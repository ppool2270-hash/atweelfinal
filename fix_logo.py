import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

content = re.sub(r'className="h-16 sm:h-\[84px\] w-auto', 'className="h-8 sm:h-10 w-auto', content)
content = re.sub(r'h-full px-4', 'px-4 py-1.5 mx-1', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
