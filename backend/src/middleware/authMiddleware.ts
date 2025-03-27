import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "Unauthorized: No token provided"});
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;

        if (typeof decoded !== "object" || !decoded.id || !decoded.username) {
            res.status(401).json({ message: "Invalid token payload" });
            return;
        }

        req.user = {
            email: decoded.id as string,
            username: decoded.username as string,
        };

        next();
    } catch (error) {
        res.status(403).json({message: "Invalid or expired token"});
        return;
    }
};
