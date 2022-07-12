import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const FIXER_URL = process.env.FIXER_URL;
export const FIXER_TOKEN = process.env.FIXER_TOKEN;
export const REST_COUNTRIES_URL = process.env.REST_COUNTRIES_URL;
export const JWT_TOKEN = process.env.JWT_TOKEN;
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
