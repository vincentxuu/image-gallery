import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { v4 as uuidv4 } from 'uuid';
import uploadFileWithProgress from '../../../firebase/uploadFileWithProgress';
import addDocument from '../../../firebase/addDocument';
import { useAuth } from '../../../context/AuthContext';
const backDrop = {
	position: 'absolute',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'rgba(0,0,0,.2)',
};

const ProgressItem = ({ file }) => {
	const [progress, setProgress] = useState(0);
	const [imageURL, setImageURL] = useState(null);
	const { currentUser, setAlert } = useAuth();
	useEffect(() => {
		const uploadImage = async () => {
			const imageName = uuidv4() + '.' + file.name.split('.').pop();
			try {
				const url = await uploadFileWithProgress(
					file,
					`gallery/${currentUser.uid}`,
					imageName,
					setProgress,
				);
				const galleryDoc = {
					imageURL: url,
					uid: currentUser?.uid || '',
					uEmail: currentUser?.email || '',
					uName: currentUser?.displayName || '',
					uPhoto: currentUser?.photoURL || '',
				};
				await addDocument('gallery', galleryDoc, imageName);
				setImageURL(null);
			} catch (error) {
				setAlert({
					isAlert: true,
					severity: 'error',
					message: error.message,
					timeout: 5000,
					location: 'modal',
				});
				console.log(error);
			}
		};
		setImageURL(URL.createObjectURL(file));
		uploadImage();
	}, [file]);
	return (
		imageURL && (
			<ImageListItem cols={1} rows={1}>
				<img src={imageURL} alt='gallery' loading='lazy' />
				<Box sx={backDrop}>
					{progress < 100 ? (
						<CircularProgressWithLabel value={progress} />
					) : (
						<CheckCircleOutline sx={{ width: 60, height: 60, color: 'lightGreen' }} />
					)}
				</Box>
			</ImageListItem>
		)
	);
};

export default ProgressItem;
