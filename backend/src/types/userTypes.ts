export interface UserPayload {
  email: string;
  displayName: string;
}

export interface User extends UserPayload {
  id?: string;
  picture?: string | null;
  avatar_url?: string | null;
}
