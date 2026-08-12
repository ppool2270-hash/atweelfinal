import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# Make header thinner
content = re.sub(r'h-24', 'h-14', content)

# Remove border-b-2 border-black
content = re.sub(r'border-b-2 transition-all.*?\? "text-black border-black".*?: "text-black border-transparent hover:text-black hover:border-gray-200"',
                 'transition-all text-sm font-medium ${activeTab === "home" ? "text-black bg-gray-100 rounded" : "text-gray-600 hover:bg-gray-100 rounded"}', content, flags=re.DOTALL)
content = re.sub(r'border-b-2 transition-all.*?\? "text-black border-gray-400/20".*?: "text-black border-transparent hover:text-black hover:border-gray-200/20"',
                 'transition-all text-sm font-medium ${isActive ? "text-black bg-gray-100 rounded" : "text-gray-600 hover:bg-gray-100 rounded"}', content, flags=re.DOTALL)

# Nav text size/tracking
content = re.sub(r'text-\[11px\] uppercase tracking-\[0\.18em\] font-semibold', 'text-[14px] font-medium tracking-normal', content)
content = re.sub(r'text-\[11px\] font-semibold', 'text-[14px] font-medium tracking-normal', content)

# Remove line separators
content = re.sub(r'<div className="w-px h-6 bg-black/25" />', '', content)

# Fix the About Us tab text styling specifically
content = re.sub(r'text-black hover:text-black hover:border-gray-200/20 transition-all', 'text-gray-600 hover:bg-gray-100 rounded transition-all', content)
content = re.sub(r'border-b-2 border-transparent text-black', 'text-gray-600', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
