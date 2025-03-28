export type User = {
  id: string;
  displayName: string;
  email: string;
  imageUrl?: string;
};

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
};
