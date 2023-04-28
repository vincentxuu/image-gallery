import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react';
import { db } from './config';

const addDocument = (collectionName, documentObj, id) => {
	const docRef = doc(collection(db, collectionName), id);
	return setDoc(docRef, {
		...documentObj,
		timestamp: serverTimestamp(),
	});
};

export default addDocument;
