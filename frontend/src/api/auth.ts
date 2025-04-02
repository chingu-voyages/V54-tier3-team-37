import { API_BASE_URL } from '@/components/constants';

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
