import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD7KlxN05OoSCGHwjXhiiYyKF5bOXianLY",
  authDomain: "keysystem-d0b86-8df89.firebaseapp.com",
  databaseURL: "https://keysystem-d0b86-8df89-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "keysystem-d0b86-8df89",
  storageBucket: "keysystem-d0b86-8df89.firebasestorage.app",
  messagingSenderId: "1048409565735",
  appId: "1:1048409565735:web:9f45b4615dbb0fa20dfc02",
  measurementId: "G-7LKZ6L01Q9"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

export { app, db };
