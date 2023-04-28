// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAV4JOy2RyLEG08_1y3ArIlYdoO1K9IHWA',
	authDomain: 'image-gallery-1e6f0.firebaseapp.com',
	projectId: 'image-gallery-1e6f0',
	storageBucket: 'image-gallery-1e6f0.appspot.com',
	messagingSenderId: '70537014100',
	appId: '1:70537014100:web:cb572940808d5ce4d976c1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();

const analytics = getAnalytics(app);
