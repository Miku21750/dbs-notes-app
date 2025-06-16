export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

export function getUserName() {
  return localStorage.getItem('name') || '';
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
}
