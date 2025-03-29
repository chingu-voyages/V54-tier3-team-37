import {User} from "@prisma/client";

/**
 * Maps a full User object to a PublicUser DTO.
 * @param user - The Prisma User object.
 * @returns A PublicUser object suitable for API responses.
 */
type PublicUser = {
    id: string;
    email: string;
    displayName: string;
    imageUrl: string | null;
    createdAt: Date;
};

/**
 * Maps a full User object to a PublicUser DTO.
 * @param user - The Prisma User object
 * @returns A PublicUser object suitable for API responses
 */
export const mapUserToPublic = (user: User) => {
    return {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        imageUrl: user.imageUrl ?? null,
        createdAt: user.createdAt.toISOString(),
    };
};