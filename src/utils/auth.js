// helpers for mock localStorage auth
export const USERS_KEY = 'mock_users_v1';
export const AUTH_KEY = 'mock_auth_user_v1';

export function loadUsers(){ try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch { return {}; } }
export function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
export function saveAuth(user){ localStorage.setItem(AUTH_KEY, JSON.stringify(user)); }
export function loadAuth(){ try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch { return null; } }
export function clearAuth(){ localStorage.removeItem(AUTH_KEY); }
