import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# Fix the extra <button
content = content.replace('                  <button\n                    \n                  <button', '                  <button')

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
