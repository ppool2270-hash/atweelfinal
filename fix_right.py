import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

content = re.sub(r'text-\[11px\] uppercase tracking-\[0\.15em\] font-semibold', 'text-[14px] font-medium tracking-normal', content)
content = re.sub(r'px-3\.5 py-2\.5 rounded-none text-\[11px\] uppercase tracking-\[0\.15em\] font-bold border transition-all', 'px-3 py-1.5 rounded text-[14px] font-medium tracking-normal border-transparent transition-all', content)
content = re.sub(r'border-r border-gray-200', 'border-transparent', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
