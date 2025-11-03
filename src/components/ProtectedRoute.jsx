import React from 'react'
import { Navigate } from 'react-router-dom'
import { loadAuth } from '../utils/auth.js'

export default function ProtectedRoute({ children }) {
	const user = loadAuth();
	if (!user) {
		return <Navigate to='/' replace />
	}
	return children;
}
