import {User} from "@prisma/client";

/**
 * Maps a full User object to a PublicUser DTO.
 * @param user - The Prisma User object.
 * @returns A PublicUser object suitable for API responses.
 */
export type PublicUser = {
    id: string;
    email: string;
    displayName: string;
    image: string | null;
    createdAt: string;
};

/**
 * Maps a full User object to a PublicUser DTO.
 * @param user - The Prisma User object
 * @returns A PublicUser object suitable for API responses
 */
export const mapUserToPublic = (user: User): PublicUser => {
    return {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        image: user.image,
        createdAt: user.createdAt.toISOString(),
    };
};
