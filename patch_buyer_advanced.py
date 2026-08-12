import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# 1. State Update
old_state = '  const [authForm, setAuthForm] = useState({ email: "", password: "", company: "", name: "" });'
new_state = '  const [authForm, setAuthForm] = useState({ email: "", password: "", company: "", name: "", taxId: "", country: "", annualVolume: "", website: "" });'
content = content.replace(old_state, new_state)

# 2. Save logic
old_profile = 'const newProfile = { name: authForm.name, company: authForm.company, email: authForm.email, createdAt: new Date().toISOString() };'
new_profile = '''const newProfile = { 
          name: authForm.name, 
          company: authForm.company, 
          email: authForm.email, 
          taxId: authForm.taxId,
          country: authForm.country,
          annualVolume: authForm.annualVolume,
          website: authForm.website,
          status: "Pending Verification",
          tier: "Standard",
          createdAt: new Date().toISOString() 
        };'''
content = content.replace(old_profile, new_profile)

# 3. UI Update (Regex replace to safely catch the form)
pattern = r'<div className="max-w-md mx-auto bg-white border border-gray-200 rounded-none p-10 mt-12">.*?Already have an account\? Sign in"\}\n\s*</button>\n\s*</div>\n\s*</div>'
replacement = '''<div className={`mx-auto bg-white border border-gray-200 rounded-none p-10 mt-12 ${isLoginMode ? 'max-w-md' : 'max-w-3xl'}`}>
                <div className="w-14 h-14 rounded-none bg-gray-200 border border-gray-200 flex items-center justify-center text-black mb-6 mx-auto">
                  <Users className="w-7 h-7" />
                </div>
                <h2 className="font-sans font-light tracking-tight text-2xl font-bold text-black text-center">{isLoginMode ? "Customer Sign-In" : "B2B Wholesale Application"}</h2>
                <p className="text-gray-500 text-xs text-center mt-2 mb-8 leading-relaxed max-w-lg mx-auto">
                  {isLoginMode ? "Sign in to view your orders, invoices, and B2B pricing." : "Apply for a wholesale account to access volume pricing, direct estate purchasing, and live inventory forecasting."}
                </p>
                
                <form onSubmit={handleAuthSubmit} className="space-y-6">
                  {!isLoginMode ? (
                    <div className="space-y-8 text-left">
                      <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Account Credentials</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="text" placeholder="Full Name" required value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                          <div className="hidden md:block"></div>
                          <input type="email" placeholder="Work Email Address" required value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                          <input type="password" placeholder="Password" required value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Business Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input type="text" placeholder="Company Legal Name" required value={authForm.company} onChange={e => setAuthForm({...authForm, company: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                          <input type="text" placeholder="Company Website (Optional)" value={authForm.website} onChange={e => setAuthForm({...authForm, website: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                          <input type="text" placeholder="Tax/VAT ID (Optional)" value={authForm.taxId} onChange={e => setAuthForm({...authForm, taxId: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                          <select required value={authForm.country} onChange={e => setAuthForm({...authForm, country: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black focus:outline-none focus:border-black">
                            <option value="">Select Region</option>
                            <option value="UK">United Kingdom</option>
                            <option value="EU">European Union</option>
                            <option value="US">North America</option>
                            <option value="Asia">Asia Pacific</option>
                            <option value="MENA">Middle East & North Africa</option>
                          </select>
                          <select required value={authForm.annualVolume} onChange={e => setAuthForm({...authForm, annualVolume: e.target.value})} className="w-full md:col-span-2 bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black focus:outline-none focus:border-black">
                            <option value="">Estimated Annual Purchasing Volume (kg)</option>
                            <option value="<5000">Less than 5,000 kg</option>
                            <option value="5000-20000">5,000 - 20,000 kg</option>
                            <option value="20000-50000">20,000 - 50,000 kg</option>
                            <option value=">50000">50,000+ kg</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input type="email" placeholder="Email Address" required value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                      <input type="password" placeholder="Password" required value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-none px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black" />
                    </div>
                  )}
                  
                  <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-none hover:brightness-110 transition-all shadow-none mt-4">
                    {isLoginMode ? "Sign In" : "Submit Wholesale Application"}
                  </button>
                </form>
                
                <div className="mt-8 text-center pt-6 border-t border-gray-100">
                  <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-xs text-gray-500 font-semibold uppercase tracking-wider hover:text-black transition-colors underline underline-offset-4">
                    {isLoginMode ? "New Buyer? Apply for an account" : "Already have an account? Sign in"}
                  </button>
                </div>
              </div>'''
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# 4. Add Banner
old_stats_comment = '{/* Dashboard Stats */}'
new_stats_banner = '''
                {customerProfile?.status === "Pending Verification" && (
                  <div className="bg-orange-50 border border-orange-200 p-6 mb-8 text-sm text-orange-900 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 shrink-0 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <strong className="block text-orange-950 font-bold mb-1 uppercase tracking-wide text-xs">Account Pending Verification</strong>
                      Your B2B wholesale application is currently under review by our compliance team. Once verified, your negotiated volume pricing tiers and allocation dashboards will unlock.
                    </div>
                  </div>
                )}
                {/* Dashboard Stats */}
'''
content = content.replace(old_stats_comment, new_stats_banner)

# We need AlertTriangle icon, let's make sure it's imported
if "AlertTriangle" not in content[:1000]:
    content = content.replace('import { Lock, Users, LogOut', 'import { Lock, Users, LogOut, AlertTriangle') # rough guess, I'll just use a safer replace
    
with open('frontend/src/App.js', 'w') as f:
    f.write(content)
