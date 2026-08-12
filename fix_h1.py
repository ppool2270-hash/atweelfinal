import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# Fix h1
content = re.sub(r'<h1 className="font-sans font-light tracking-tight tracking-tight text-white leading-\[1\.15\] sm:leading-\[1\.1\] max-w-4xl mx-auto ">', 
                 '<h1 className="font-sans font-medium tracking-tight text-4xl sm:text-5xl md:text-6xl text-white leading-tight max-w-4xl mx-auto">', content)

# Actually remove FLOATING_GRADES.map ...
content = re.sub(r'\{FLOATING_GRADES\.map\(\(item, idx\) => \(.*?\)\)\}', '', content, flags=re.DOTALL)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
