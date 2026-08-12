import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# 1. Remove rounded corners
content = re.sub(r'rounded-(3xl|2xl|xl)', 'rounded-sm', content)
content = re.sub(r'rounded-lg', 'rounded-sm', content)
content = re.sub(r'rounded-full', 'rounded', content)

# 2. Remove heavy shadows
content = re.sub(r'shadow-2xl', '', content)
content = re.sub(r'shadow-xl', '', content)
content = re.sub(r'shadow-lg', '', content)
content = re.sub(r'shadow-md', '', content)
content = re.sub(r'shadow-\[.*?\]', '', content)

# 3. Replace font-serif with font-sans
content = re.sub(r'font-serif', 'font-sans font-light tracking-tight', content)

# 4. Remove heavy gradients and borders
# We will leave bg-white/95 and borders, but maybe replace border-white/20 with border-transparent or border-gray-100
content = re.sub(r'border-white/20', 'border-gray-200/20', content)
content = re.sub(r'border-tata-grey-light/60', 'border-transparent', content)
content = re.sub(r'border-tata-grey-light', 'border-gray-100', content)
content = re.sub(r'bg-tata-bg-light', 'bg-gray-50', content)
content = re.sub(r'bg-tata-bg-lighter', 'bg-white', content)
content = re.sub(r'bg-tata-dark', 'bg-black', content)
content = re.sub(r'text-tata-dark', 'text-black', content)

# 5. Buttons - make them more Tesla-like (solid color, or outline)
content = re.sub(r'bg-tata-blue-dark hover:bg-tata-blue-light', 'bg-black hover:bg-gray-900', content)
content = re.sub(r'text-tata-blue-light', 'text-gray-300', content)
content = re.sub(r'border border-white/30 bg-black/40 hover:bg-white/10', 'bg-white hover:bg-gray-100 text-black', content)
content = re.sub(r'bg-tata-blue-light', 'bg-gray-200', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
