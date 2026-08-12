import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# I want to remove the FIRST instance of the erp block
match = re.search(r'(\{cmsTab === "erp" && siteErp && \(.*?)\{cmsTab === "erp" && siteErp && \(', content, re.DOTALL)
if match:
    # Remove the first block
    content = content.replace(match.group(1), '')

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
