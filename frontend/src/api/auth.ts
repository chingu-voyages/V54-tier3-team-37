const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const popped = parts.pop();
    if (popped) {
      return popped.split(';').shift();
    }
  }
  return undefined;
}

export const getCurrentUser = async () => {
  if (!API_BASE_URL) {
    throw new Error('Error: VITE_API_BASE_URL is not defined in the environment variables');
  }
  const token = getCookie('token');
  if (!token) {
    throw new Error('Error: No token found in cookies')
  }
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) throw new Error('User not authenticated');

  const data = await res.json();
  return data.user;
};

export const logoutUser = async () => {
  if (!API_BASE_URL) {
    throw new Error('Error: VITE_API_BASE_URL is not defined in the environment variables');
  }
  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Logout failed');
};
