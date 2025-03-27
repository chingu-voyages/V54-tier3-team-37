import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "Unauthorized: No token provided"});
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; username: string };
        req.user = {email: decoded.id, username: decoded.username};

        next();
    } catch (error) {
        res.status(403).json({message: "Invalid or expired token"});
        return;
    }
};
