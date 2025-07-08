// decode token payload
export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch  {
    return null;
  }
}

// cek apakah token masih berlaku
export function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  } catch {
    return false;
  }
}

// hapus semua data login
export function clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
}
