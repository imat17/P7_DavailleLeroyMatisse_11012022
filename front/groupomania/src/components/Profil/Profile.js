import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { UidContext } from '../AppContext';

const ProfileForm = () => {
	const [pseudo, setPseudo] = useState('');
	const [email, setEmail] = useState('');
	const [file, setFile] = useState(null);

	const uid = useContext(UidContext);

	const getProfile = () => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
		})
			.then((res) => {
				console.log(res);
				setPseudo(res.data.pseudo);
				setEmail(res.data.email);
				setFile(res.data.picture);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	getProfile();

	const deleteProfile = () => {
		axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		
	};

	const editProfile = () => {
		const editProfileData = new FormData();
		editProfileData.append('pseudo', pseudo);
		editProfileData.append('email', email);
		editProfileData.append('file', file);

		axios({
			method: 'put',
			url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
			withCredentials: true,
			data: editProfileData,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className='profile__pic'>
				<img src={file} alt='' />
			</div>
			<form action='' onSubmit={editProfile} id='profile__form'>
				<label htmlFor='email'>Email</label>
				<br />
				<input type='text' name='email' id='email' onChange='' value={email} />
				<div className='email__error'></div>
				<br />
				<label htmlFor='pseudo'>Pseudo</label>
				<br />
				<input type='text' name='pseudo' id='pseudo' onChange='' value={pseudo} />
				<div className='pseudo__error'></div>
				<div className='profile__input'>
					<input type='submit' value='Sauvegarder' />
					<input type='submit' onClick={deleteProfile} value='Supprimer mon compte' />
				</div>
			</form>
		</>
	);
};

export default ProfileForm;
