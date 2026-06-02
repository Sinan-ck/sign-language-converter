import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBUST56aFNnEggqLL5ouNxmq6pofE-tTMk",
  authDomain: "project3-164fc.firebaseapp.com",
  projectId: "project3-164fc",
  storageBucket: "project3-164fc.firebasestorage.app",
  messagingSenderId: "127340042393",
  appId: "1:127340042393:web:162fa9f886841a437c0008",
  measurementId: "G-C6K9NZVRT0"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)