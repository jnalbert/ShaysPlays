import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
import { getFunctions } from "firebase/functions"


import Constants from 'expo-constants';

// Initialize Firebase

const firebaseConfig = {
  apiKey: Constants?.manifest?.extra?.apiKey,
  authDomain: Constants?.manifest?.extra?.authDomain,
  projectId: Constants?.manifest?.extra?.projectId,
  storageBucket: Constants?.manifest?.extra?.storageBucket,
  messagingSenderId: Constants?.manifest?.extra?.messagingSenderId,
  appId: Constants?.manifest?.extra?.appId,
  measurementId: Constants?.manifest?.extra?.measurementId,
};



const Firebase = initializeApp(firebaseConfig)


export const FirebaseAll = Firebase
export const Auth = getAuth(FirebaseAll)
export const db = getFirestore(FirebaseAll)
export const storage = getStorage(FirebaseAll);

