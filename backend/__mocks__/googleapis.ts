// Do not remove or edit this file
// Mocking google is crucial for testing
export const google = {
  auth: {
    OAuth2: jest.fn().mockImplementation(() => ({
      generateAuthUrl: jest.fn(),
      getToken: jest.fn(),
      setCredentials: jest.fn(),
    })),
  },
  oauth2: jest.fn().mockReturnValue({
    userinfo: {
      get: jest.fn(),
    },
  }),
};
