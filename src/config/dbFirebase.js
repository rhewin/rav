import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { firebaseConfig } from '../constant.js';

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
