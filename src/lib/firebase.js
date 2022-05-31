import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_DATABASE_URL,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  databaseURL: VITE_DATABASE_URL,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
