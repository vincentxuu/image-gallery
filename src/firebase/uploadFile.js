import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { storage } from './config';

const uploadFile = (file, filePath) => {
	return async (resolve, reject) => {
		const storageRef = ref(storage, filePath);
		try {
			await uploadBytes(storageRef, file);
			const url = await getDownloadURL(storageRef);
			resolve(url);
		} catch (error) {
			reject(error);
		}
	};
};

export default uploadFile;
