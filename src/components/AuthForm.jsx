import React, { useState } from 'react'
import { saveAuth, loadUsers, saveUsers } from '../utils/auth.js'

export default function AuthForm({ onLogin }) {
	const [mode, setMode] = useState('login');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [msg, setMsg] = useState(null);

	function switchMode() {
		setMsg(null);
		setMode(mode === 'login' ? 'register' : 'login');
	}

	function handleRegister(e) {
		e.preventDefault();
		const users = loadUsers();
		if (!name || !email || !password) { 
			setMsg({ type: 'error', text: 'Fill name, email and password.' }); 
			return; 
		}
		if (users[email]) { 
			setMsg({ type: 'error', text: 'Email already registered.' }); 
			return; 
		}
		users[email] = { name, email, password };
		saveUsers(users);
		const auth = { name, email };
		saveAuth(auth);
		onLogin && onLogin(auth);
	}

	function handleLogin(e) {
		e.preventDefault();
		const users = loadUsers();
		if (!email || !password) { 
			setMsg({ type: 'error', text: 'Provide email and password.' }); 
			return; 
		}
		const u = users[email];
		if (!u || u.password !== password) { 
			setMsg({ type: 'error', text: 'Invalid credentials.' }); 
			return; 
		}
		const auth = { name: u.name, email: u.email };
		saveAuth(auth);
		onLogin && onLogin(auth);
	}

	return (
		<div className="card">
			<h2>{mode === 'login' ? 'Log In' : 'Register'}</h2>
			{msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
			<form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
				{mode === 'register' && (<label className='label'>Name<input value={name} onChange={e => setName(e.target.value)} placeholder='Your name' /></label>)}
				<label className='label'>Email<input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='you@example.com' /></label>
				<label className='label'>Password<input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='password' /></label>
				<div className='row'>
					<button type='submit' className='btn primary'>{mode === 'login' ? 'Log In' : 'Create account'}</button>
					<button type='button' className='btn' onClick={switchMode}>{mode === 'login' ? 'Register' : 'Log In'}</button>
				</div>
			</form>
			<p className='muted'>auth — stored only in your browser.</p>
		</div>
	)
}
