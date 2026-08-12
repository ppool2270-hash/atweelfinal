import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

# Replace the "Admin CMS" button to add "Customer Portal" beside it in Header
old_admin_btn = """            <button
              onClick={() => setActiveTab("admin")}
              data-testid="header-admin-button"
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-none text-[11px] font-bold uppercase tracking-widest transition-all border ${
                activeTab === "admin"
                  ? "bg-black text-gray-300 border-black"
                  : "bg-gray-50 text-black border-gray-200 hover:bg-gray-200"
              }`}
              title="Access Dynamic Content Management System & Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-black" />
              <span>Admin CMS</span>
            </button>"""

new_account_btn = """            <button
              onClick={() => setActiveTab("account")}
              data-testid="header-account-button"
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-none text-[11px] font-bold uppercase tracking-widest transition-all border ${
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

content = content.replace(old_admin_btn, new_account_btn)

# Add to mobile menu
content = content.replace('{ id: "admin", label: "🔐 Admin CMS & Content Manager" }', '{ id: "account", label: "👤 My Account / Customer Portal" },\n              { id: "admin", label: "🔐 Admin CMS & Content Manager" }')

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
