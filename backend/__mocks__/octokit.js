// Do not remove or edit this file
// Mocking octokit is crucial for testing
export const Octokit = jest.fn().mockImplementation(() => ({
  defaults: jest.fn(() => ({})),
  request: jest.fn(() => Promise.resolve({ data: {} })),
}));
