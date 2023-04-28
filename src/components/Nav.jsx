import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useState } from 'react';
import { Button } from '@mui/material';
import { SportsMartialArts } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Login from './user/Login';
import Profile from './user/Profile';
import Upload from './upload/Upload';

export default function Nav() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { currentUser, setModal, logout, setAlert } = useAuth();

	const openLogin = () => {
		setModal({ isOpen: true, title: 'Login', content: <Login /> });
	};
	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			setAlert({
				isAlert: true,
				severity: 'error',
				message: error.message,
				timeout: 8000,
				location: 'main',
			});
			console.log(error);
		}
	};
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				background: '#f3f5f6',
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
				<Typography variant='h4' sx={{ color: '#212124', p: 2 }}>
					Catch The Move
				</Typography>
				{currentUser ? <Upload /> : ''}
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				{!currentUser ? (
					<Button
						size='large'
						startIcon={<SportsMartialArts />}
						onClick={openLogin}
						sx={{ color: '#212124' }}
					>
						Login
					</Button>
				) : (
					<Tooltip title='Account settings'>
						<IconButton
							onClick={handleClick}
							size='large'
							sx={{ ml: 2 }}
							aria-controls={open ? 'account-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
						>
							<Avatar sx={{ width: 50, height: 50 }} src={currentUser.photoURL}>
								{currentUser?.displayName}
							</Avatar>
						</IconButton>
					</Tooltip>
				)}
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{/* <MenuItem
					onClick={() =>
						setModal({
							isOpen: true,
							title: 'Upload Profile',
							content: <Profile />,
						})
					}
				>
					<Avatar src={currentUser?.photoURL} /> Profile
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Settings fontSize='small' />
					</ListItemIcon>
					Settings
				</MenuItem> */}
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	);
}
