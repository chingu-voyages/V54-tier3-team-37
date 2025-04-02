import {
  createTestUser,
  deleteTestUser,
  prisma,
} from "../../__mocks__/prismaTestUtils";
import { findOrCreateUserId } from "../../src/controllers/findOrCreateUser";
import { mockUsers } from "../../__mocks__/mockUsers";

describe("findOrCreateuserId", () => {
  test("returns an existing user id if user exists", async () => {
    const validMockUsers = mockUsers.validUser;
    for (const mockUser of validMockUsers) {
      let newUser;
      try {
        newUser = await createTestUser(mockUser);

        if (!newUser) throw Error("failed to create a test user");

        const userId = await findOrCreateUserId({
          email: mockUser.email,
          displayName: mockUser.displayName,
        });

        expect(userId).toBe(newUser.id);

        const deleted = await deleteTestUser(userId);

        expect(deleted.id).toBe(userId);
      } catch (error) {
        throw new Error(error.message ? error.message : String(error));
      }
    }
  });

  test("creates a new user and returns their id if user does not exist", async () => {
    const validMockUsers = mockUsers.unregisteredUser;
    for (const mockUser of validMockUsers) {
      try {
        const userId = await findOrCreateUserId({
          email: mockUser.email,
          displayName: mockUser.displayName,
        });

        expect(userId).toBeDefined();

        const deleted = await deleteTestUser(userId);

        expect(deleted.id).toBe(userId);
      } catch (error) {
        throw new Error(error.message ? error.message : String(error));
      }
    }
  });
});
