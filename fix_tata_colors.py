import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

content = re.sub(r'border-tata-blue-light(/20)?', 'border-black', content)
content = re.sub(r'bg-tata-blue-light', 'bg-gray-200', content)
content = re.sub(r'text-tata-blue-light', 'text-gray-500', content)
content = re.sub(r'from-tata-bg-light', 'from-gray-50', content)
content = re.sub(r'to-tata-bg-light', 'to-gray-50', content)
content = re.sub(r'bg-tata-bg-light', 'bg-gray-50', content)
content = re.sub(r'text-tata-[a-zA-Z-]+', 'text-black', content)
content = re.sub(r'shadow-tata-dark/10', 'shadow-none', content)
content = re.sub(r'shadow-tata-[a-zA-Z-/0-9]+', 'shadow-none', content)

# Header background
# It's currently likely bg-white/95 backdrop-blur-md or something. Let's make it plain solid white for simplicity and contrast if we are below hero, or transparent on hero.
# Actually let's just make sure there are no other `rounded-sm` sneaking around.
content = re.sub(r'rounded-sm', 'rounded-none', content)

# One more thing: The buttons have uppercase tracking-widest, let's just make sure they look clean.
content = re.sub(r'font-sans font-light tracking-tight text-xs uppercase tracking-\[0\.22em\]', 'font-sans text-xs uppercase tracking-widest', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
