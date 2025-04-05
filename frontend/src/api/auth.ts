const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  console.error('Error: VITE_API_BASE_URL is not defined in the environment variables.');
}

export const getCurrentUser = async () => {
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('User not authenticated');

  const data = await res.json();
  return data.user;
};

export const logoutUser = async () => {
  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Logout failed');
};
