const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async () => {
  if (!API_BASE_URL) {
    throw new Error('Error: VITE_API_BASE_URL is not defined in the environment variables');
  }

  console.log(' Making request to /users/me with credentials: "include"');

  const fetchOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
  };

  const res = await fetch(`${API_BASE_URL}/users/me`, fetchOptions);

  console.log('getCurrentUser Response status:', res.status);

  if (!res.ok) {
    console.warn(' User not authenticated (401)');
    throw new Error('User not authenticated');
  }

  const data = await res.json();

  console.log(' Authenticated user data:', data.user);

  return data.user;
};

export const logoutUser = async () => {
  if (!API_BASE_URL) {
    throw new Error('Error: VITE_API_BASE_URL is not defined in the environment variables');
  }

  console.log('Logging out user...');

  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  console.log(' Logout response status:', res.status);

  if (!res.ok) {
    console.warn('Logout failed');
    throw new Error('Logout failed');
  }

  console.log('User logged out successfully');
};
