import requests
import json

res = requests.get("http://localhost:3000/api/site-data")
print("ERP present:", 'erp' in res.json())
