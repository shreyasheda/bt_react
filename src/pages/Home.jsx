import React from 'react'
import AuthForm from '../components/AuthForm.jsx'
import { loadAuth } from '../utils/auth.js'
import { Link } from 'react-router-dom'

export default function Home() {
	const user = loadAuth();
	return (
		<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
			<div>
				<div className='card'>
					<h2>Welcome</h2>
					<p className='muted'>This demo app shows protected routes and repository search. Log in or register to continue.</p>
					{!user && <AuthForm onLogin={() => window.location.reload()} />}
					{user && (
						<div>
							<p className='muted'>You're logged in as <strong>{user.name}</strong>.</p>
							<p><Link to='/repos' className='btn primary'>Go to Repositories</Link></p>
						</div>
					)}
				</div>
			</div>

			<div>
				<div className='card'>
					<h3>How it works</h3>
					<ul>
						<li>Register or login (stored in localStorage)</li>
						<li>Protected route: <code>/repos</code> only accessible when logged in</li>
						<li>Repository search uses GitHub Search API and shows full details</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
