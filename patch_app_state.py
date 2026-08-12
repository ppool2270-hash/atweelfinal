import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

state_addition = """
  const [currentUser, setCurrentUser] = useState(null);
  const [customerProfile, setCustomerProfile] = useState(null);
  const [authForm, setAuthForm] = useState({ email: "", password: "", company: "", name: "" });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerInvoices, setCustomerInvoices] = useState([]);
"""

if 'const [currentUser' not in content:
    content = content.replace('  const [activeTab, setActiveTab] = useState("home");', '  const [activeTab, setActiveTab] = useState("home");\n' + state_addition)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
