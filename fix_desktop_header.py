import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

old_admin_btn = """            <button
              onClick={() => setActiveTab("admin")}
              data-testid="header-admin-button"
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-none text-[11px] uppercase tracking-[0.15em] font-bold border transition-all ${
                activeTab === "admin"
                  ? "bg-black text-gray-300 border-black"
                  : "bg-gray-50 text-black border-gray-200 hover:bg-gray-200"
              }`}
              title="Access Dynamic Content Management System & Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-black" />
              <span>Admin CMS</span>
            </button>"""

new_btns = """            <button
              onClick={() => setActiveTab("account")}
              data-testid="header-account-button"
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-none text-[11px] uppercase tracking-[0.15em] font-bold border transition-all ${
                activeTab === "account"
                  ? "bg-black text-gray-300 border-black"
                  : "bg-gray-50 text-black border-gray-200 hover:bg-gray-200"
              }`}
              title="Customer Account Portal"
            >
              <Users className="w-3.5 h-3.5 text-black" />
              <span>My Account</span>
            </button>
""" + old_admin_btn

content = content.replace(old_admin_btn, new_btns)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
