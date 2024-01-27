// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7y-sit5dUY5CcGE1KFtMm83dwxU2e0NY',
  authDomain: 'insta-2-clone-e0fb5.firebaseapp.com',
  projectId: 'insta-2-clone-e0fb5',
  storageBucket: 'insta-2-clone-e0fb5.appspot.com',
  messagingSenderId: '839254827336',
  appId: '1:839254827336:web:0bd73ccd03471d1817937d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
// const storage = !getApps().length ? getStorage() : getApp();
const storage = getStorage();

export { app, db, storage };
