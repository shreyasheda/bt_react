import React, { useEffect, useState } from 'react'
import { loadAuth, loadUsers, saveUsers, saveAuth, clearAuth } from '../utils/auth.js'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
	const navigate = useNavigate();
	const [user, setUser] = useState(loadAuth());
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');
	const [msg, setMsg] = useState(null);

	useEffect(() => {
		setName(user?.name || '');
		setEmail(user?.email || '');
	}, [user]);

	function saveProfile() {
		if (!name || !email) { setMsg({ type: 'error', text: 'Name and email required.' }); return; }
		const users = loadUsers();
		const existing = users[user.email];
		if (existing) {
			delete users[user.email];
			users[email] = { ...existing, name, email };
			saveUsers(users);
			const newAuth = { name, email };
			saveAuth(newAuth);
			setUser(newAuth);
			setMsg({ type: 'success', text: 'Profile saved.' });
			setEditing(false);
		} else {
			setMsg({ type: 'error', text: 'Original user not found.' });
		}
	}

	function signOut() {
		clearAuth();
		navigate('/');
		window.location.reload();
	}

	if (!user) {
		return <div className='card'><p className='muted'>Not logged in. Please <a href='/'>login</a>.</p></div>
	}

	return (
		<div className='card'>
			<div className='card-header'>
				<h3>Your Profile</h3>
				<div>
					<button className='btn' onClick={signOut}>Sign out</button>
					<button className='btn primary' onClick={() => setEditing(s => !s)}>{editing ? 'Cancel' : 'Edit'}</button>
				</div>
			</div>

			{msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}

			{editing ? (
				<div>
					<label className='label'>Name<input value={name} onChange={e => setName(e.target.value)} /></label>
					<label className='label'>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
					<div className='row'>
						<button className='btn primary' onClick={saveProfile}>Save</button>
						<button className='btn' onClick={() => setEditing(false)}>Cancel</button>
					</div>
				</div>
			) : (
				<div className='profile-info'>
					<div><strong>Name:</strong> {user.name}</div>
					<div><strong>Email:</strong> {user.email}</div>
				</div>
			)}
		</div>
	)
}
