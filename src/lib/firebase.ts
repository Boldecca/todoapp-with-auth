import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFCu4kl2paeKd25LGVHEpwj8xwmiqvyqs",
  authDomain: "authentication-359fb.firebaseapp.com",
  projectId: "authentication-359fb",
  storageBucket: "authentication-359fb.firebasestorage.app",
  messagingSenderId: "885683251515",
  appId: "1:885683251515:web:d4f36f93a832b44b0c6f1e",
  measurementId: "G-RCJ4600KHJ"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
