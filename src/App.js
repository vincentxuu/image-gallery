import { Container } from '@mui/material';
import React from 'react';
import ImagesList from './components/imagesList/ImagesList';
import Loading from './components/Loading';
import MainNotification from './components/MainNotification';
import Modal from './components/Modal';
import Nav from './components/Nav';
import AuthContext from './context/AuthContext';

const App = () => {
	return (
		<Container maxWidth='lg' sx={{ textAlign: 'center', mt: '3rem' }}>
			<AuthContext>
				<Loading />
				<Modal />
				<MainNotification />
				<Nav />
				<ImagesList />
			</AuthContext>
		</Container>
	);
};

export default App;
