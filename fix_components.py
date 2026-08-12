import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    
    # Completely strip any remaining "tata-" strings
    content = re.sub(r'tata-blue-dark', 'black', content)
    content = re.sub(r'tata-blue-light', 'gray-400', content)
    content = re.sub(r'tata-cyan', 'black', content)
    content = re.sub(r'tata-green', 'gray-500', content)
    content = re.sub(r'tata-dark', 'black', content)
    content = re.sub(r'tata-grey-light', 'gray-200', content)
    content = re.sub(r'tata-grey', 'gray-400', content)
    content = re.sub(r'tata-bg-lighter', 'white', content)
    content = re.sub(r'tata-bg-light', 'gray-50', content)
    content = re.sub(r'tata-bg', 'gray-50', content)
    content = re.sub(r'tata-', 'gray-', content)
    
    # Let's also fix rounded-2xl to rounded-none
    content = re.sub(r'rounded-(xl|2xl|3xl|lg|md|sm|full)', 'rounded-none', content)
    
    # Drop shadows
    content = re.sub(r'shadow-(xl|2xl|lg|md|sm|inner)', 'shadow-none', content)
    
    # Fix gradients and borders
    content = re.sub(r'border-white/10', 'border-gray-200', content)
    content = re.sub(r'border-white/20', 'border-gray-200', content)
    content = re.sub(r'border-white/5', 'border-gray-200', content)

    # Some elements had bg-[#174195] or bg-[#1468b3]
    content = re.sub(r'bg-\[#174195\]', 'bg-black', content)
    content = re.sub(r'bg-\[#1468b3\]', 'bg-gray-800', content)
    content = re.sub(r'text-\[#174195\]', 'text-black', content)
    content = re.sub(r'text-\[#1468b3\]', 'text-gray-800', content)
    content = re.sub(r'border-\[#174195\]', 'border-black', content)
    content = re.sub(r'border-\[#1468b3\]', 'border-gray-800', content)
    content = re.sub(r'ring-\[#174195\]', 'ring-black', content)
    
    # Make sure text-black text-white etc don't overlap strangely, 
    # but for now let's just replace font-serif with font-sans
    content = re.sub(r'font-serif', 'font-sans tracking-tight', content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('frontend/src'):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            fix_file(os.path.join(root, file))
