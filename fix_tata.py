import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# Completely strip any remaining "tata-" strings
content = re.sub(r'bg-gradient-to-[a-z] from-tata-dark via-tata-dark/30 to-transparent', 'bg-gradient-to-t from-black via-black/30 to-transparent', content)
content = re.sub(r'from-tata-dark/70', 'from-black/70', content)
content = re.sub(r'from-tata-dark/85', 'from-black/85', content)
content = re.sub(r'via-tata-dark/10', 'via-black/10', content)
content = re.sub(r'from-tata-dark via-tata-dark to-tata-dark', 'from-black to-black bg-black', content)
content = re.sub(r'from-tata-dark to-tata-dark', 'from-black to-black bg-black', content)
content = re.sub(r'bg-gradient-to-[a-z] from-tata-blue-dark.*?to-tata-blue-dark', 'bg-black', content)
content = re.sub(r'from-tata-blue-dark to-tata-blue-dark', 'from-black to-black bg-black', content)
content = re.sub(r'accent-tata-blue-dark', 'accent-black', content)
content = re.sub(r'ring-tata-blue-dark/30', 'ring-gray-300', content)
content = re.sub(r'placeholder-tata-grey-light', 'placeholder-gray-400', content)
content = re.sub(r'divide-tata-grey-light/60', 'divide-gray-200', content)
content = re.sub(r'border-tata-dark/60', 'border-gray-200', content)
content = re.sub(r'border-tata-dark', 'border-black', content)
content = re.sub(r'hover:border-tata-dark', 'hover:border-black', content)
content = re.sub(r'text-black bg-black text-black border border-tata-dark hover:bg-black text-black', 'text-black bg-white hover:bg-gray-100 border border-gray-200', content)
content = re.sub(r'bg-black text-black hover:bg-black', 'bg-white text-black hover:bg-gray-100 border-gray-200', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
