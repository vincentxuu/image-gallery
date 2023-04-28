import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { db } from './config';

const deleteDocument = (collectionName, documentId) => {
	return deleteDoc(doc(db, collectionName, documentId));
};

export default deleteDocument;
