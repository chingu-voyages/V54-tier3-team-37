import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { findUserById } from "../controllers/index.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the token from cookies
  const token = req.cookies.authorization;

  if (!token) {
    res
      .status(401)
      .json({ error: "Access denied", message: "Token not provided" });
    return;
  }

  try {
    // Decode the token
    const decoded = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as jwt.JwtPayload;

    // Check if the token is expired
    // Since 'exp' is in seconds we multiply by 1000 to compare with Date.now()
    const expiration = (decoded.exp || 0) * 1000;
    if (Date.now() > expiration) {
      // The user must refresh their token or log in again
      res
        .status(401)
        .json({ error: "Access denied", message: "Token is expired" });
      return;
    }

    // Find user - decoded.sub is user id
    const user = await findUserById(String(decoded.sub));
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    // Attach user id to the request
    req.userId = user.id;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT verification error:", error);
      res.status(401).json({ error: "JWT verification error", message: error });
    }

    res.status(401).json({ error: "Unknown JsonWebToken error" });
  }
};
