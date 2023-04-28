import { Add } from '@mui/icons-material';
import { Fab, IconButton, Input } from '@mui/material';
import React from 'react';
import { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from '../user/Login';

const Form = ({ setFiles }) => {
	const { currentUser, setModal } = useAuth();
	const fileRef = useRef();
	const handleClick = () => {
		fileRef.current.click();
	};

	const handleChange = (e) => {
		setFiles([...e.target.files]);
		fileRef.current.value = null;
	};
	return (
		<form>
			<Input
				type='file'
				inputProps={{ multiple: true }}
				sx={{ display: 'none', color: '#212124' }}
				inputRef={fileRef}
				onChange={handleChange}
			/>
			<IconButton
				sx={{ border: '3px solid ', color: '#212124' }}
				color='primary'
				aria-label='add'
				onClick={handleClick}
			>
				<Add fontSize='normal' />
			</IconButton>
		</form>
	);
};

export default Form;
