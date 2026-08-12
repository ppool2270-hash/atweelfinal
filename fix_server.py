import re

with open('server.js', 'r') as f:
    content = f.read()

update_endpoint = """
app.post('/api/admin/erp', (req, res) => {
  const { token, erpData } = req.body;
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  siteErp = erpData;
  res.json({ success: true, erp: siteErp });
});
"""

if '/api/admin/erp' not in content:
    content = content.replace("app.get('*', (req, res) => {", update_endpoint + "\napp.get('*', (req, res) => {")
    with open('server.js', 'w') as f:
        f.write(content)
