import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# 1. Add recharts imports
recharts_import = "import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';\n"
content = content.replace('import { Toaster, toast } from "sonner";', 'import { Toaster, toast } from "sonner";\n' + recharts_import)

# 2. Add AI state to App component
states_addition = """
  const [siteErp, setSiteErp] = useState(null);
  const [isRunningAi, setIsRunningAi] = useState(false);
  const [aiForecast, setAiForecast] = useState(null);
  
  const REVENUE_DATA = [
    { month: "Jan", revenue: 210000 },
    { month: "Feb", revenue: 280000 },
    { month: "Mar", revenue: 320000 },
    { month: "Apr", revenue: 410000 },
    { month: "May", revenue: 390000 },
    { month: "Jun", revenue: 520000 },
    { month: "Jul", revenue: 610000 },
    { month: "Aug", revenue: 710000 }
  ];
"""
content = content.replace('const [siteErp, setSiteErp] = useState(null);', states_addition)

# 3. Add ERP update logic
erp_logic = """
  const saveErpData = async (newErp) => {
    try {
      const res = await axios.post(`${API}/admin/erp`, { token: adminToken, erpData: newErp });
      if (res.data.success) {
        setSiteErp(res.data.erp);
        toast.success("ERP data synchronized");
      }
    } catch (err) {
      toast.error("Failed to update ERP data");
    }
  };

  const handleMarkInvoicePaid = (invId) => {
    if (!siteErp) return;
    const newErp = { ...siteErp };
    const inv = newErp.invoices.find(i => i.id === invId);
    if (inv) {
      inv.status = 'Paid';
      newErp.financials.pendingReceivables -= inv.amount;
      newErp.financials.ytdRevenue += inv.amount;
      saveErpData(newErp);
    }
  };

  const handleShipOrder = (orderId) => {
    if (!siteErp) return;
    const newErp = { ...siteErp };
    const order = newErp.orders.find(o => o.id === orderId);
    if (order && order.status === 'Processing') {
      order.status = 'Shipped';
      saveErpData(newErp);
    }
  };

  const runAiForecast = () => {
    setIsRunningAi(true);
    setAiForecast(null);
    setTimeout(() => {
      setIsRunningAi(false);
      setAiForecast({
        critical: ["CTC Premium"],
        message: "Current CTC PO pipeline (12,000kg) exceeds active warehouse reserves (+4,500kg safety stock threshold). Expect depletion in 8 days.",
        recommendation: "Increase plucking rotation in Sector 4 to match upcoming European export demands."
      });
      toast.success("AI Forecast Generated");
    }, 2500);
  };
"""
content = content.replace('const handleAdminLogin = async (e) => {', erp_logic + '\n  const handleAdminLogin = async (e) => {')


# 4. Update the ERP panel UI
new_erp_ui = """
                {cmsTab === "erp" && siteErp && (
                  <div className="space-y-8" data-testid="cms-erp-panel">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-none border border-gray-200">
                      <div>
                        <h2 className="font-sans font-light tracking-tight text-xl font-bold text-black">Advanced ERP & B2B Orders</h2>
                        <p className="text-gray-500 text-xs mt-1">Manage purchase orders, invoices, inventory, and run AI predictive forecasting.</p>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={runAiForecast}
                          disabled={isRunningAi}
                          className="bg-gray-100 text-black border border-gray-200 font-bold px-4 py-2.5 rounded-none text-xs hover:bg-gray-200 transition-all flex items-center gap-2"
                        >
                          {isRunningAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                          <span>{isRunningAi ? "Analyzing..." : "Run AI Forecast"}</span>
                        </button>
                        <button className="bg-black text-white font-bold px-5 py-2.5 rounded-none text-xs hover:bg-gray-800 transition-all flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          <span>New PO</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* AI FORECAST BANNER */}
                    {aiForecast && (
                      <div className="bg-black text-white p-6 border border-gray-200 rounded-none shadow-none flex flex-col md:flex-row gap-6 items-start animate-in fade-in slide-in-from-top-2">
                        <div className="w-12 h-12 bg-gray-800 rounded-none flex items-center justify-center shrink-0">
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-sans font-bold text-sm uppercase tracking-widest text-gray-300 mb-2">AI Supply Chain Forecast</h3>
                          <p className="text-sm font-mono text-gray-100 mb-3 leading-relaxed">{aiForecast.message}</p>
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-black px-2 py-1">ACTION REQUIRED</span>
                            <span className="text-xs text-gray-400">{aiForecast.recommendation}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ERP Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-4 text-gray-500">
                          <TrendingUp className="w-5 h-5 text-black" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">YTD Revenue</span>
                        </div>
                        <div className="text-3xl font-sans font-bold text-black">${(siteErp.financials.ytdRevenue || 0).toLocaleString()}</div>
                        <div className="mt-2 text-xs text-gray-500 font-bold">{siteErp.financials.monthlyGrowth} from last month</div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-4 text-gray-500">
                          <CreditCard className="w-5 h-5 text-black" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Pending Receivables</span>
                        </div>
                        <div className="text-3xl font-sans font-bold text-black">${(siteErp.financials.pendingReceivables || 0).toLocaleString()}</div>
                        <div className="mt-2 text-xs text-gray-500 font-medium">Awaiting payment from invoices</div>
                      </div>

                      <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-4 text-gray-500">
                          <Boxes className="w-5 h-5 text-black" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">Total Inventory</span>
                        </div>
                        <div className="text-3xl font-sans font-bold text-black">{Object.values(siteErp.inventory).reduce((a, b) => a + b, 0).toLocaleString()} <span className="text-lg text-gray-500">kg</span></div>
                        <div className="mt-2 text-xs text-gray-500 font-medium">Across 4 export grades</div>
                      </div>
                    </div>
                    
                    {/* CHARTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none">
                        <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wide mb-6">Revenue Growth (2026)</h3>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={REVENUE_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} tickFormatter={(val) => `$${val/1000}k`} />
                              <RechartsTooltip cursor={{stroke: '#ccc', strokeWidth: 1}} contentStyle={{ borderRadius: 0, border: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 'bold' }} />
                              <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={3} dot={{r: 4, fill: '#000', strokeWidth: 0}} activeDot={{r: 6}} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 p-6 rounded-none shadow-none">
                        <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wide mb-6">Current Inventory (kg)</h3>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Object.entries(siteErp.inventory).map(([k,v]) => ({name: k, qty: v}))} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                              <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: 0, border: '1px solid #e5e7eb', fontSize: '12px', fontWeight: 'bold' }} />
                              <Bar dataKey="qty" fill="#000" radius={[2, 2, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
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
                                <th className="text-left px-4 py-3 font-semibold">Status / Action</th>
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
                                    {po.status === 'Processing' ? (
                                      <button 
                                        onClick={() => handleShipOrder(po.id)}
                                        className="text-[9px] bg-black text-white px-2 py-1 uppercase tracking-wider font-bold hover:bg-gray-800 transition-colors"
                                      >
                                        Ship Order
                                      </button>
                                    ) : (
                                      <span className={`inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-wider border ${po.status === 'Delivered' ? 'bg-gray-100 border-gray-200 text-black' : 'bg-gray-800 border-black text-white'}`}>
                                        {po.status}
                                      </span>
                                    )}
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
                                <th className="text-left px-4 py-3 font-semibold">Due Date</th>
                                <th className="text-left px-4 py-3 font-semibold">Amount</th>
                                <th className="text-left px-4 py-3 font-semibold">Status / Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {siteErp.invoices.map((inv, idx) => (
                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 font-mono font-bold text-black text-xs">{inv.id}</td>
                                  <td className="px-4 py-3 text-xs text-black">{inv.dueDate}</td>
                                  <td className="px-4 py-3 text-xs font-bold text-black">${inv.amount.toLocaleString()}</td>
                                  <td className="px-4 py-3">
                                    {inv.status === 'Unpaid' ? (
                                      <button 
                                        onClick={() => handleMarkInvoicePaid(inv.id)}
                                        className="text-[9px] bg-black text-white px-2 py-1 uppercase tracking-wider font-bold hover:bg-gray-800 transition-colors"
                                      >
                                        Mark Paid
                                      </button>
                                    ) : (
                                      <span className="inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-wider border bg-gray-100 border-gray-200 text-black">
                                        Paid
                                      </span>
                                    )}
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

content = re.sub(
    r'\{cmsTab === "erp" && siteErp && \(.*?</section>|(?=\{cmsTab === "announcement" && \()',
    new_erp_ui,
    content,
    flags=re.DOTALL,
    count=1
)

# Fix replacing everything up to cmsTab === announcement
with open('frontend/src/App.js', 'w') as f:
    f.write(content)
