import re

with open('frontend/public/index.html', 'r') as f:
    content = f.read()

# Replace green/gold with black/white/gray in HTML
content = re.sub(r'#0F2B1D', '#000000', content)
content = re.sub(r'#D4AF37', '#ffffff', content)
content = re.sub(r'#FBF9F6', '#ffffff', content)
content = re.sub(r'#C5A880', '#aaaaaa', content)
content = re.sub(r'rgba\(15, 43, 29, 0\.95\)', 'rgba(0, 0, 0, 0.95)', content)
content = re.sub(r'rgba\(212, 175, 55, 0\.3\)', 'rgba(255, 255, 255, 0.3)', content)

# Replace fonts
content = re.sub(r'font-family:\s*\'Cormorant Garamond\', Georgia, serif;', 'font-family: sans-serif;', content)
content = re.sub(r'font-family:serif;', 'font-family: sans-serif;', content)

with open('frontend/public/index.html', 'w') as f:
    f.write(content)
