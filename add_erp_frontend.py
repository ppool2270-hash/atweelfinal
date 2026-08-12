import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# 1. Add lucide icons
content = re.sub(
    r'Plus, Trash2, Edit3, RotateCcw, Save, Lock, Settings, RefreshCw, Bell, Upload, History, Copy, Check, Bot, Coffee, Droplets, ShoppingBag, Users',
    r'Plus, Trash2, Edit3, RotateCcw, Save, Lock, Settings, RefreshCw, Bell, Upload, History, Copy, Check, Bot, Coffee, Droplets, ShoppingBag, Users, Briefcase, FileSpreadsheet, CreditCard',
    content
)

# 2. Add siteErp state
content = content.replace('const [siteShipments, setSiteShipments] = useState([]);',
                          'const [siteShipments, setSiteShipments] = useState([]);\n  const [siteErp, setSiteErp] = useState(null);')

# 3. Add to fetchSiteData
fetch_site_data = """
        if (res.data.erp) {
          setSiteErp(res.data.erp);
        }
"""
content = content.replace('if (res.data.enquiries) {', fetch_site_data + '        if (res.data.enquiries) {')

# Add to handleImportData
import_site_data = """
        if (res.data.erp) setSiteErp(res.data.erp);
"""
content = content.replace('if (res.data.enquiries) setEnquiries(res.data.enquiries);', 'if (res.data.enquiries) setEnquiries(res.data.enquiries);\n' + import_site_data)

# 4. Add Tab Button
erp_tab_btn = """
                  <button
                    onClick={() => setCmsTab("erp")}
                    data-testid="cms-tab-erp"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-bold transition-all ${
                      cmsTab === "erp"
                        ? "bg-black text-gray-300 "
                        : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Advanced ERP & B2B Orders</span>
                  </button>
"""
content = content.replace('onClick={() => setCmsTab("announcement")}', erp_tab_btn + '\n                  <button\n                    onClick={() => setCmsTab("announcement")}')

# 5. Add ERP Panel
erp_panel = """
                {cmsTab === "erp" && siteErp && (
                  <div className="space-y-8" data-testid="cms-erp-panel">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-none border border-gray-200">
                      <div>
                        <h2 className="font-sans font-light tracking-tight text-xl font-bold text-black">Advanced ERP & B2B Orders</h2>
                        <p className="text-gray-500 text-xs mt-1">Manage purchase orders, invoices, inventory, and B2B financials in real-time.</p>
                      </div>
                      <div className="flex gap-3">
                        <button className="bg-black text-white font-bold px-5 py-2.5 rounded-none text-xs hover:bg-gray-800 transition-all flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          <span>New PO</span>
                        </button>
                      </div>
                    </div>

                    {/* ERP Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-2 text-gray-500">
                          <TrendingUp className="w-5 h-5 text-black" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">YTD Revenue</span>
                        </div>
                        <div className="text-3xl font-sans font-bold text-black">${(siteErp.financials.ytdRevenue || 0).toLocaleString()}</div>
                        <div className="mt-2 text-xs text-green-600 font-bold">{siteErp.financials.monthlyGrowth} from last month</div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-2 text-gray-500">
                          <CreditCard className="w-5 h-5 text-black" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Pending Receivables</span>
                        </div>
                        <div className="text-3xl font-sans font-bold text-black">${(siteErp.financials.pendingReceivables || 0).toLocaleString()}</div>
                        <div className="mt-2 text-xs text-gray-500 font-medium">Awaiting payment from 4 invoices</div>
                      </div>

                      <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-2 text-gray-500">
                          <Boxes className="w-5 h-5 text-black" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Total Inventory</span>
                        </div>
                        <div className="text-3xl font-sans font-bold text-black">{Object.values(siteErp.inventory).reduce((a, b) => a + b, 0).toLocaleString()} <span className="text-lg text-gray-500">kg</span></div>
                        <div className="mt-2 text-xs text-gray-500 font-medium">Across 4 export grades</div>
                      </div>
                    </div>

                    {/* ERP Orders & Invoices Tables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Purchase Orders */}
                      <div className="bg-white border border-gray-200 p-0 rounded-none shadow-none flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                          <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wide flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-gray-500"/> Purchase Orders
                          </h3>
                        </div>
                        <div className="p-0 overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                                <th className="text-left px-4 py-3 font-semibold">PO #</th>
                                <th className="text-left px-4 py-3 font-semibold">Buyer & Items</th>
                                <th className="text-left px-4 py-3 font-semibold">Amount</th>
                                <th className="text-left px-4 py-3 font-semibold">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {siteErp.orders.map((po, idx) => (
                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 font-mono font-bold text-black text-xs">{po.id}</td>
                                  <td className="px-4 py-3 text-xs text-black">
                                    <div className="font-bold">{po.buyer}</div>
                                    <div className="text-gray-500 text-[10px]">{po.items}</div>
                                  </td>
                                  <td className="px-4 py-3 text-xs font-bold text-black">${po.amount.toLocaleString()}</td>
                                  <td className="px-4 py-3">
                                    <span className={`inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-wider border ${po.status === 'Delivered' ? 'bg-gray-100 border-gray-200 text-black' : po.status === 'Shipped' ? 'bg-gray-800 border-black text-white' : 'bg-white border-gray-300 text-gray-600'}`}>
                                      {po.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Invoices */}
                      <div className="bg-white border border-gray-200 p-0 rounded-none shadow-none flex flex-col">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                          <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wide flex items-center gap-2">
                            <FileSpreadsheet className="w-4 h-4 text-gray-500"/> Invoices & Billing
                          </h3>
                        </div>
                        <div className="p-0 overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-white text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                                <th className="text-left px-4 py-3 font-semibold">Invoice #</th>
                                <th className="text-left px-4 py-3 font-semibold">Linked PO</th>
                                <th className="text-left px-4 py-3 font-semibold">Due Date</th>
                                <th className="text-left px-4 py-3 font-semibold">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {siteErp.invoices.map((inv, idx) => (
                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 font-mono font-bold text-black text-xs">{inv.id}</td>
                                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{inv.orderId}</td>
                                  <td className="px-4 py-3 text-xs text-black">{inv.dueDate}</td>
                                  <td className="px-4 py-3">
                                    <span className={`inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-wider border ${inv.status === 'Paid' ? 'bg-gray-100 border-gray-200 text-black' : 'bg-black border-black text-white'}`}>
                                      {inv.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
"""

content = content.replace('{cmsTab === "announcement" && (', erp_panel + '\n                {cmsTab === "announcement" && (')

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
