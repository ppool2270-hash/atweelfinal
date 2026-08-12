import re

with open('server.js', 'r') as f:
    content = f.read()

firebase_route = """
app.get('/firebase-applet-config.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'firebase-applet-config.json'));
});
"""
if '/firebase-applet-config.json' not in content:
    content = content.replace("app.get('/api/site-data',", firebase_route + "\napp.get('/api/site-data',")
    with open('server.js', 'w') as f:
        f.write(content)
