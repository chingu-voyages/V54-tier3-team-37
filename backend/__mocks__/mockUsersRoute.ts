import { v4 as uuidv4 } from "uuid";
import {generateToken} from "../src/utils";


/**
 * Type-safe mock user
 */
export type MockUser = {
    id: string;
    email: string;
    displayName: string;
    imageUrl: string | null;
    createdAt: Date;
};

/**
 * Generate a reusable mock user
 */
export const createMockUser = (): MockUser => ({
    id: uuidv4(),
    email: "test@gmail.com",
    displayName: "Test User",
    imageUrl: null,
    createdAt: new Date("2024-01-01T00:00:00Z"),
});

/**
 * Generate JWT token based on a mock user
 */
export const createMockToken = (user: MockUser): string => {
    return generateToken(user);
};

/**
 * Generate both mock user and token
 */
export const createMockUserAndToken = () => {
    const user = createMockUser();
    const token = createMockToken(user);
    return { user, token };
};


