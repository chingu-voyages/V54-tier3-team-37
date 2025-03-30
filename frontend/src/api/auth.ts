import { API_BASE_URL } from '@/components/constants';

export const getUserById = async (userId: string) => {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('User not found');

  return res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Logout failed');
};
