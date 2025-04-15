// Do not print errors to console
jest.spyOn(console, 'error').mockImplementation(() => {});