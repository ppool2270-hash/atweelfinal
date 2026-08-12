import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

account_view = """
        {/* VIEW: CUSTOMER ACCOUNT PORTAL */}
        {activeTab === "account" && (
          <div className="py-12 px-6 max-w-5xl mx-auto" data-testid="view-account">
            {!currentUser ? (
              <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-none p-10 mt-12">
                <div className="w-14 h-14 rounded-none bg-gray-200 border border-gray-200 flex items-center justify-center text-black mb-6 mx-auto">
                  <Users className="w-7 h-7" />
                </div>
                <h2 className="font-sans font-light tracking-tight text-2xl font-bold text-black text-center">{isLoginMode ? "Customer Sign-In" : "Create Account"}</h2>
                <p className="text-gray-500 text-xs text-center mt-2 mb-6 leading-relaxed">
                  {isLoginMode ? "Sign in to view your orders, invoices, and B2B pricing." : "Register to access wholesale pricing and track your shipments."}
                </p>
                
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {!isLoginMode && (
                    <>
                      <input type="text" placeholder="Full Name" required value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                      <input type="text" placeholder="Company Name" required value={authForm.company} onChange={e => setAuthForm({...authForm, company: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                    </>
                  )}
                  <input type="email" placeholder="Email Address" required value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                  <input type="password" placeholder="Password" required value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                  
                  <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-none hover:brightness-110 transition-all shadow-none mt-2">
                    {isLoginMode ? "Sign In" : "Register Account"}
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-xs text-gray-500 font-semibold uppercase tracking-wider hover:text-black transition-colors underline underline-offset-4">
                    {isLoginMode ? "Need an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-200 pb-6">
                  <div>
                    <h1 className="font-sans font-light tracking-tight text-3xl sm:text-4xl font-bold text-black mt-1">My Account</h1>
                    <p className="text-gray-500 text-sm mt-1 font-bold">Welcome back, {customerProfile?.name || currentUser.email} ({customerProfile?.company || "Independent"})</p>
                  </div>
                  <button onClick={handleCustomerLogout} className="text-gray-500 hover:text-black text-xs font-semibold uppercase tracking-widest border border-gray-200 px-4 py-2">
                    Sign Out
                  </button>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-none">
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Active Orders</div>
                    <div className="text-2xl font-bold text-black">{customerOrders.filter(o => o.status !== 'Delivered').length}</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-none">
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Unpaid Invoices</div>
                    <div className="text-2xl font-bold text-black">{customerInvoices.filter(i => i.status === 'Unpaid').length}</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-none">
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Lifetime Volume</div>
                    <div className="text-2xl font-bold text-black">
                      {customerOrders.reduce((acc, o) => {
                         const match = o.items.match(/([0-9,]+)\s*kg/i);
                         if (match) return acc + parseInt(match[1].replace(/,/g, ''));
                         return acc;
                      }, 0).toLocaleString()} <span className="text-sm font-normal text-gray-500">kg</span>
                    </div>
                  </div>
                  <div className="bg-black border border-black p-6 rounded-none text-white flex flex-col justify-between items-start">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2">Partner Tier</div>
                      <div className="text-xl font-bold flex items-center gap-2"><Award className="w-5 h-5 text-yellow-500" /> Wholesale</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                  {/* Orders */}
                  <div className="bg-white border border-gray-200 shadow-none">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wide flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-500"/> Order History
                      </h3>
                    </div>
                    {customerOrders.length > 0 ? (
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-white text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                            <th className="text-left px-4 py-3 font-semibold">Order #</th>
                            <th className="text-left px-4 py-3 font-semibold">Items</th>
                            <th className="text-left px-4 py-3 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerOrders.map(po => (
                            <tr key={po.id} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="px-4 py-3 font-mono font-bold text-black text-xs">{po.id}</td>
                              <td className="px-4 py-3 text-[11px] text-gray-600">{po.items}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-wider border ${po.status === 'Delivered' ? 'bg-gray-100 border-gray-200 text-black' : po.status === 'Shipped' ? 'bg-black text-white' : 'bg-white border-gray-300 text-gray-500'}`}>
                                  {po.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-8 text-center text-sm text-gray-500">No orders found matching your company name.</div>
                    )}
                  </div>

                  {/* Invoices */}
                  <div className="bg-white border border-gray-200 shadow-none">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="font-sans font-bold text-black text-sm uppercase tracking-wide flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-gray-500"/> Invoices
                      </h3>
                    </div>
                    {customerInvoices.length > 0 ? (
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-white text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                            <th className="text-left px-4 py-3 font-semibold">Invoice #</th>
                            <th className="text-left px-4 py-3 font-semibold">Amount</th>
                            <th className="text-left px-4 py-3 font-semibold">Due</th>
                            <th className="text-left px-4 py-3 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerInvoices.map(inv => (
                            <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="px-4 py-3 font-mono font-bold text-black text-xs">{inv.id}</td>
                              <td className="px-4 py-3 text-xs font-bold">${inv.amount.toLocaleString()}</td>
                              <td className="px-4 py-3 text-[11px] text-gray-600">{inv.dueDate}</td>
                              <td className="px-4 py-3">
                                <span className={`inline-block px-2 py-1 text-[9px] font-bold uppercase tracking-wider border ${inv.status === 'Paid' ? 'bg-gray-100 border-gray-200 text-black' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                  {inv.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-8 text-center text-sm text-gray-500">No invoices available.</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
"""

content = content.replace('{/* VIEW 6: WHOLESALE PRICE & MOQ CALCULATOR */}', account_view + '\n        {/* VIEW 6: WHOLESALE PRICE & MOQ CALCULATOR */}')

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
