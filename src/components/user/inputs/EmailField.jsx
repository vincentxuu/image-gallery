import { TextField } from '@mui/material';
import React from 'react';

const EmailField = ({ emailRef, deafaultValue = '' }) => {
	return (
		<TextField
			autoFocus
			margin='normal'
			variant='standard'
			id='email'
			label='Email Address'
			type='email'
			fullWidth
			required
			inputRef={emailRef}
			deafaultValue={deafaultValue}
		/>
	);
};

export default EmailField;
