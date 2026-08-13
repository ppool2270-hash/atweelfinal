export const onAuthStateChanged = (auth, callback) => {
  window.__authCallback = callback;
  const storedUser = localStorage.getItem('mockUser');
  if (storedUser) {
    callback(JSON.parse(storedUser));
  } else {
    callback(null);
  }
  return () => { window.__authCallback = null; };
};

export const signInWithEmailAndPassword = async (auth, email, password) => {
  const uid = "user_" + btoa(email).substring(0, 15).replace(/=/g, '');
  const user = { uid, email };
  localStorage.setItem('mockUser', JSON.stringify(user));
  if (window.__authCallback) window.__authCallback(user);
  return { user };
};

export const createUserWithEmailAndPassword = async (auth, email, password) => {
  const uid = "user_" + btoa(email).substring(0, 15).replace(/=/g, '');
  const user = { uid, email };
  localStorage.setItem('mockUser', JSON.stringify(user));
  if (window.__authCallback) window.__authCallback(user);
  return { user };
};

export const signOut = async (auth) => {
  localStorage.removeItem('mockUser');
  if (window.__authCallback) window.__authCallback(null);
};
