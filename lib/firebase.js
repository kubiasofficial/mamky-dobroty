import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl4Du30lO3RrFnXA92j8pZYbqA6I-XMfY",
  authDomain: "mamky-dobroty.firebaseapp.com",
  databaseURL: "https://mamky-dobroty-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mamky-dobroty",
  storageBucket: "mamky-dobroty.firebasestorage.app",
  messagingSenderId: "675542455795",
  appId: "1:675542455795:web:146350b85f1f0b982c6e86",
  measurementId: "G-1VNMN3JHGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (FIRESTORE, ne Realtime Database)
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;