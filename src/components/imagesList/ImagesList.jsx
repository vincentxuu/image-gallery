import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Avatar, Tooltip, Typography } from '@mui/material';
import moment from 'moment/moment';
import Options from './Options';
import useFirestore from '../../firebase/useFirestore';
import { useAuth } from '../../context/AuthContext';

function srcset(image, size, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
		srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
	};
}

export default function ImagesList() {
	const { currentUser } = useAuth();
	const { documents } = useFirestore('gallery');
	const [isOpen, setIsOpen] = useState(false);
	const [photoIndex, setPhotoIndex] = useState(0);
	return (
		<>
			<ImageList
				variant='quilted'
				sx={{ '@media (max-width: 767px)': { gridTemplateColumns: 'unset !important' } }}
				cols={4}
				rowHeight={200}
			>
				{documents.map((item, index) => (
					<ImageListItem
						key={item?.id}
						cols={pattern[index - Math.floor(index / pattern.length) * pattern.length].cols}
						rows={pattern[index - Math.floor(index / pattern.length) * pattern.length].rows}
						sx={{
							opacity: '.8',
							transtion: 'opacity .3s liner',
							cursor: 'pointer',
							'&:hover': { opacity: 1 },
						}}
					>
						{currentUser?.uid === item?.data?.uid && <Options imageId={item?.id} />}
						<img
							{...srcset(
								item?.data?.imageURL,
								200,
								pattern[index - Math.floor(index / pattern.length) * pattern.length].rows,
								pattern[index - Math.floor(index / pattern.length) * pattern.length].cols,
							)}
							alt={item?.data?.uName || item?.data?.uEmail?.split('@')[0]}
							loading='lazy'
							onClick={() => {
								setPhotoIndex(index);
								setIsOpen(true);
							}}
						/>
						<Typography
							variant='body2'
							component='span'
							sx={{
								position: 'absolute',
								bottom: 0,
								left: 0,
								color: 'white',
								background: 'rgba(0,0,0,0.3)',
								p: '5px',
								borderRadius: 8,
							}}
						>
							{moment(item?.data?.timestamp?.toDate()).fromNow()}
						</Typography>
						<Tooltip
							title={item?.data?.uName || item?.data?.uEmail?.split('@')[0]}
							sx={{
								position: 'absolute',
								bottom: '3px',
								right: '3px',
							}}
						>
							<Avatar src={item?.data?.uPhoto} imgProps={{ 'aria-hidden': true }} />
						</Tooltip>
					</ImageListItem>
				))}
			</ImageList>
			{isOpen && (
				<Lightbox
					mainSrc={documents[photoIndex]?.data?.imageURL}
					nextSrc={documents[(photoIndex + 1) % documents.length]?.data?.imageURL}
					prevSrc={
						documents[(photoIndex + documents.length - 1) % documents.length]?.data?.imageURL
					}
					onCloseRequest={() => setIsOpen(false)}
					onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % documents.length)}
					onMovePrevRequest={() =>
						setPhotoIndex((photoIndex + documents.length - 1) % documents.length)
					}
					imageTitle={documents[photoIndex]?.data?.uName}
					imageCaption={documents[photoIndex]?.data?.uEmail}
				/>
			)}
		</>
	);
}

const pattern = [
	{ rows: 2, cols: 2 },
	{ rows: 1, cols: 1 },
	{ rows: 1, cols: 1 },
	{ rows: 1, cols: 1 },
	{ rows: 1, cols: 1 },
	{ rows: 1, cols: 1 },
	{ rows: 1, cols: 1 },
	{ rows: 2, cols: 2 },
	{ rows: 1, cols: 1 },
	{ rows: 1, cols: 1 },
];
