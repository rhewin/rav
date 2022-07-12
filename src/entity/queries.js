import {collection, addDoc, doc, getDocs, query, updateDoc, where} from 'firebase/firestore/lite';
import { db } from '../config/dbFirebase.js';

export default class Queries {
  constructor(colPath) {
    this.colPath = colPath;
  }

  async getAllRecord() {
    const col = collection(db, this.colPath);
    const snapshot = await getDocs(col);
    let data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }
  async addRecord(input) {
    await addDoc(collection(db, this.colPath), input);
  }
  async updateRecord(id, value) {
    const docRef = doc(db, this.colPath, id);
    await updateDoc(docRef, value)
      .then((_) => {
        console.log(
          'A New Document Field has been added to an existing document'
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getRecordbyField(field, value) {
    const q = query(collection(db, 'users'), where(field, '==', value));
    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }
}
