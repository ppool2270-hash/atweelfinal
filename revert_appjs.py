import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# 1. Revert header height
content = re.sub(r'max-w-7xl mx-auto px-6 h-14', 'max-w-7xl mx-auto px-6 h-24', content)

# 2. Revert logo size
content = re.sub(r'h-8 sm:h-10 w-auto', 'h-16 sm:h-[84px] w-auto', content)

# 3. Revert Nav buttons
nav_regex = r'px-4 py-1\.5 mx-1 flex items-center gap-1\.5 uppercase tracking-\[0\.18em\] text-\[14px\] font-medium tracking-normal transition-all text-sm font-medium \$\{.*?\? "text-black bg-gray-100 rounded" : "text-gray-600 hover:bg-gray-100 rounded"\}'
new_nav = 'h-full px-4 flex items-center gap-1.5 uppercase tracking-[0.18em] text-[11px] font-semibold border-b-2 transition-all ${activeTab === "home" ? "text-black border-black" : "text-black border-transparent hover:text-black hover:border-gray-200"}'
new_nav_dropdown = 'h-full px-4 flex items-center gap-1.5 uppercase tracking-[0.18em] text-[11px] font-semibold border-b-2 transition-all ${isActive ? "text-black border-black" : "text-black border-transparent hover:text-black hover:border-gray-200"}'

# Need to replace the home button specifically
content = re.sub(nav_regex, new_nav, content, count=1)
# Then the dropdown buttons
content = re.sub(nav_regex, new_nav_dropdown, content)

# About us button
content = re.sub(r'text-gray-600 hover:bg-gray-100 rounded transition-all', 'text-black hover:text-black hover:border-gray-200/20 transition-all border-b-2 border-transparent', content)

# Re-insert the line separators after Home
content = content.replace('</button>\n\n            \n\n            {/* PRODUCTS */}', '</button>\n            <div className="w-px h-6 bg-black/25" />\n\n            {/* PRODUCTS */}')

# 4. Revert Right side
content = re.sub(r'text-\[14px\] font-medium tracking-normal', 'text-[11px] uppercase tracking-[0.15em] font-semibold', content)
content = re.sub(r'px-3 py-1\.5 rounded text-\[11px\] uppercase tracking-\[0\.15em\] font-semibold border-transparent transition-all', 'px-3.5 py-2.5 rounded-none text-[11px] uppercase tracking-[0.15em] font-bold border transition-all', content)
# Restore border-r
content = content.replace('className="hidden xl:flex items-center gap-1.5 border-transparent pr-3"', 'className="hidden xl:flex items-center gap-1.5 border-r border-gray-200 pr-3"')

# 5. Restore rounded-none where it was rounded (globally, because we want it back to brutalist)
# But wait, there were some things that were naturally rounded.
# I'll let the user's previous "rounded-none" command be fully restored.
content = re.sub(r'\brounded\b', 'rounded-none', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
