import re

with open('frontend/src/index.css', 'r') as f:
    content = f.read()

content = re.sub(r'@apply border-border;', '@apply border-gray-200;', content)
content = re.sub(r'bg-background text-foreground', 'bg-white text-black', content)

with open('frontend/src/index.css', 'w') as f:
    f.write(content)
