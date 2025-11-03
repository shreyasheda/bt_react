import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import RepoSearch from './pages/RepoSearch.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { loadAuth, clearAuth } from './utils/auth.js'

export default function App() {
	const navigate = useNavigate();
	const user = loadAuth();

	function handleSignOut() {
		clearAuth();
		navigate('/');
		window.location.reload();
	}

	return (
		<div className="app-shell">
			<header className="topbar">
				<div className="brand"><Link to="/">GitHub Profile App</Link></div>
				<nav className="nav">
					<Link to="/">Home</Link>
					<Link to="/repos">Repositories</Link>
					<Link to="/profile">Profile</Link>
					{user ? <button className="btn-link" onClick={handleSignOut}>Sign out</button> : null}
				</nav>
				<div className="user-pill">{user ? user.name : 'Guest'}</div>
			</header>

			<main className="main-grid">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/repos" element={
						<ProtectedRoute>
							<RepoSearch />
						</ProtectedRoute>
					} />
					<Route path="*" element={<Home />} />
				</Routes>
			</main>

			<footer className="footer">Demo app — mock auth using localStorage</footer>
		</div>
	)
}
