import re

with open('frontend/src/App.js', 'r') as f:
    content = f.read()

firebase_imports = """
import { initFirebase, getFirebaseDB, getFirebaseAuth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
"""

if 'initFirebase' not in content:
    content = content.replace('import { Toaster, toast } from "sonner";', 'import { Toaster, toast } from "sonner";\n' + firebase_imports)

with open('frontend/src/App.js', 'w') as f:
    f.write(content)
