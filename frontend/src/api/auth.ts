import { getCookie } from '@/utils/getCookie';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async () => {
  if (!API_BASE_URL) {
    throw new Error('Error: VITE_API_BASE_URL is not defined in the environment variables');
  }

  const token = await getCookie('token');
  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const fetchOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: headers,
  };

  const res = await fetch(`${API_BASE_URL}/users/me`, fetchOptions);
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
