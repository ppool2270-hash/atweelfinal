import re

with open('server.js', 'r') as f:
    content = f.read()

# 1. Add INITIAL_ERP
erp_data = """
const INITIAL_ERP = {
  orders: [
    { id: "PO-2026-891", buyer: "Amsterdam Tea Co.", date: "2026-08-10", amount: 145000, status: "Processing", items: "12,000kg CTC" },
    { id: "PO-2026-890", buyer: "Nairobi Blenders", date: "2026-08-08", amount: 89000, status: "Shipped", items: "8,500kg Orthodox" },
    { id: "PO-2026-889", buyer: "London Premium", date: "2026-08-05", amount: 210000, status: "Delivered", items: "15,000kg Silver Needle" }
  ],
  invoices: [
    { id: "INV-2026-891", orderId: "PO-2026-891", dueDate: "2026-09-10", status: "Unpaid", amount: 145000 },
    { id: "INV-2026-890", orderId: "PO-2026-890", dueDate: "2026-09-08", status: "Paid", amount: 89000 },
    { id: "INV-2026-889", orderId: "PO-2026-889", dueDate: "2026-09-05", status: "Paid", amount: 210000 }
  ],
  financials: {
    ytdRevenue: 3450000,
    pendingReceivables: 450000,
    monthlyGrowth: "+12.4%"
  },
  inventory: {
    "CTC Premium": 45000,
    "Orthodox": 12000,
    "Silver Needle": 3500,
    "Green Emerald": 8000
  }
};
let siteErp = JSON.parse(JSON.stringify(INITIAL_ERP));
"""
content = content.replace('let siteShipments = {', erp_data + '\nlet siteShipments = {')

# 2. Add to /api/site-data
content = content.replace('enquiries\n  });', 'enquiries,\n    erp: siteErp\n  });')

# 3. Add to /api/admin/reset
content = content.replace('siteShipments = JSON.parse(JSON.stringify(INITIAL_SHIPMENTS));', 'siteShipments = JSON.parse(JSON.stringify(INITIAL_SHIPMENTS));\n    siteErp = JSON.parse(JSON.stringify(INITIAL_ERP));')

# 4. Add update endpoint
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
content = content.replace('const PORT = process.env.PORT || 3000;', update_endpoint + '\nconst PORT = process.env.PORT || 3000;')

with open('server.js', 'w') as f:
    f.write(content)
