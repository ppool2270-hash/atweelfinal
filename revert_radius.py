import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    content = re.sub(r'\brounded\b', 'rounded-none', content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)

for root, dirs, files in os.walk('frontend/src'):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            fix_file(os.path.join(root, file))
