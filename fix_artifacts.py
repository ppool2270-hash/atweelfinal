import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# Fix drop- artifacts
content = re.sub(r'drop- ', ' ', content)
content = re.sub(r'drop-\s', ' ', content)
content = re.sub(r'drop-"', '"', content)

# Fix double font weights
content = re.sub(r'font-sans font-light tracking-tight .*? font-medium', 'font-sans font-light tracking-tight', content)

# Fix button icons in Hero
content = re.sub(r'<ArrowRight className="w-4 h-4 text-black" />', '<ArrowRight className="w-4 h-4" />', content)
content = re.sub(r'<ArrowRight className="w-4 h-4 text-white" />', '<ArrowRight className="w-4 h-4" />', content)

# Fix text-black text-white
content = re.sub(r'text-black text-white', 'text-black', content)

# Remove the floating grades
content = re.sub(r'\{/\* Floating Tea Grades \*/\}.*?\{/\* Floating Tea Grades \*/\}', '', content, flags=re.DOTALL)
content = re.sub(r'\{/\* Floating Tea Grades \*/\}.*?\{FLOATING_GRADES\.map[\s\S]*?\}\)\}\s*</div>', '</div>', content)

# Remove background gradients and borders to flatten the design
content = re.sub(r'bg-gradient-to-r from-transparent via-[a-zA-Z0-9-]+ to-transparent', 'bg-transparent', content)

# Make hero full screen
content = re.sub(r'min-h-\[90svh\] sm:min-h-\[500px\]', 'h-screen', content)

# Fix colors
content = re.sub(r'text-tata-grey-light', 'text-gray-400', content)
content = re.sub(r'text-tata-grey', 'text-gray-500', content)
content = re.sub(r'bg-tata-blue-dark', 'bg-black', content)
content = re.sub(r'text-tata-blue-dark', 'text-black', content)

# Make cards cleaner (no background/border)
content = re.sub(r'bg-white border border-gray-200/20 rounded overflow-hidden hover:border-gray-200/20 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md', 'bg-white overflow-hidden transition-all flex flex-col justify-between group border-b border-gray-200 hover:bg-gray-50 pb-6', content)
content = re.sub(r'bg-white border border-gray-200/20 rounded overflow-hidden hover:border-gray-200/20 transition-all flex flex-col justify-between group  hover:', 'bg-white overflow-hidden transition-all flex flex-col justify-between group border-b border-gray-200 hover:bg-gray-50 pb-6', content)

# Change bg-[#0a0a0a] to black
content = re.sub(r'bg-\[#0a0a0a\]', 'bg-black', content)

# Fix headers
content = re.sub(r'h2 className="font-sans font-light tracking-tight text-3xl sm:text-5xl lg:text-6xl text-black', 'h2 className="font-sans font-medium tracking-tight text-3xl sm:text-4xl text-black', content)
content = re.sub(r'h3 className="font-sans font-light tracking-tight text-2xl font-bold text-black', 'h3 className="font-sans text-xl font-medium text-black', content)

# Ensure rounded-sm is removed entirely to make it Tesla-like sharp edges
content = re.sub(r'rounded-sm', 'rounded-none', content)
content = re.sub(r' rounded ', ' rounded-none ', content)
content = re.sub(r' rounded"', ' rounded-none"', content)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
