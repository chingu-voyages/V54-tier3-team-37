export type User = {
  displayName: string;
  email: string;
  createdAt: string;
  imageUrl?: string;
};

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
};
