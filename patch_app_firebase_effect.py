import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

firebase_effect = """
  // Initialize Firebase and Auth Listener
  useEffect(() => {
    initFirebase().then(({ auth, db }) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          try {
            const profileRef = doc(db, 'customers', user.uid);
            const docSnap = await getDoc(profileRef);
            if (docSnap.exists()) {
              setCustomerProfile(docSnap.data());
            }
          } catch (e) {
            console.error("Error fetching user profile", e);
          }
        } else {
          setCurrentUser(null);
          setCustomerProfile(null);
        }
      });
    }).catch(console.error);
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const { auth, db } = await initFirebase();
    if (isLoginMode) {
      try {
        await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
        toast.success("Successfully logged in");
      } catch (err) {
        toast.error("Login failed: " + err.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, authForm.email, authForm.password);
        const user = userCredential.user;
        const newProfile = { name: authForm.name, company: authForm.company, email: authForm.email, createdAt: new Date().toISOString() };
        await setDoc(doc(db, 'customers', user.uid), newProfile);
        setCustomerProfile(newProfile);
        toast.success("Account created successfully");
      } catch (err) {
        toast.error("Signup failed: " + err.message);
      }
    }
  };

  const handleCustomerLogout = async () => {
    const { auth } = await initFirebase();
    await signOut(auth);
    toast.success("Logged out successfully");
  };

  // Sync customer orders and invoices when siteErp changes
  useEffect(() => {
    if (currentUser && customerProfile && siteErp) {
      const orders = siteErp.orders.filter(o => o.buyer === customerProfile.company);
      const invoices = siteErp.invoices.filter(i => orders.some(o => o.id === i.orderId));
      setCustomerOrders(orders);
      setCustomerInvoices(invoices);
    }
  }, [currentUser, customerProfile, siteErp]);
"""

if 'handleAuthSubmit' not in content:
    content = content.replace('  const [siteErp, setSiteErp] = useState(null);', '  const [siteErp, setSiteErp] = useState(null);\n' + firebase_effect)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
