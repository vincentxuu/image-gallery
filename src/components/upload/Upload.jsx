import { Box } from '@mui/material';
import React, { useState } from 'react';
import Form from './Form';
import ProgressList from './porgressList/ProgressList';

const Upload = () => {
	const [files, setFiles] = useState([]);
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Form setFiles={setFiles} />
			<ProgressList files={files} />
		</Box>
	);
};

export default Upload;
