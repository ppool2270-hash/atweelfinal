import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let app;
let db;
let auth;
let initPromise;

export const initFirebase = () => {
  if (initPromise) return initPromise;
  initPromise = fetch('/firebase-applet-config.json')
    .then(res => res.json())
    .then(config => {
      app = initializeApp(config);
      db = getFirestore(app, config.firestoreDatabaseId || 'atweeltea');
      auth = getAuth(app);
      return { app, db, auth };
    });
  return initPromise;
};

export const getFirebaseDB = () => db;
export const getFirebaseAuth = () => auth;
