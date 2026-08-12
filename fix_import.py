with open('frontend/src/App.js', 'r') as f:
    content = f.read()
content = content.replace('} from "lucide-react";', ', AlertTriangle\n} from "lucide-react";')
with open('frontend/src/App.js', 'w') as f:
    f.write(content)
