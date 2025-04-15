import authReducer, { fetchUser, logout } from '@/store/slices/authSlice';

jest.mock('@/api/auth', () => ({
  getUserById: jest.fn(),
}));

describe('authSlice', () => {
  const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  };

  const mockUser = {
    id: '123',
    displayName: 'Luis',
    email: 'luis@example.com',
    imageUrl: 'https://img.com/luis.jpg',
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle logout', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isLoggedIn: true,
    };

    const nextState = authReducer(stateWithUser, logout());
    expect(nextState).toEqual(initialState);
  });

  it('should handle fetchUser.fulfilled', () => {
    const action = {
      type: fetchUser.fulfilled.type,
      payload: mockUser,
    };

    const nextState = authReducer(initialState, action);

    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isLoggedIn).toBe(true);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchUser.pending', () => {
    const action = { type: fetchUser.pending.type };

    const nextState = authReducer(initialState, action);

    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchUser.rejected', () => {
    const action = {
      type: fetchUser.rejected.type,
      payload: 'Something went wrong',
    };

    const nextState = authReducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Something went wrong');
    expect(nextState.isLoggedIn).toBe(false);
  });
});
