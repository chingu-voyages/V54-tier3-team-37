import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { findUserById } from "../controllers/index.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the token from cookies
  const token = req.cookies.token;

  if (!token) {
    res
      .status(401)
      .json({ error: "Access denied", message: "Token not provided" });
    return;
  }

  try {
    const verifiedToken = await verifyJWT(token);
    if (!verifiedToken) {
      res
        .status(401)
        .json({ error: "Access denied", message: "Token is not verified" });
      return;
    }

    // Find user - decoded.sub is user id
    const user = await findUserById(String(verifiedToken.sub));
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    // Attach user id to the request
    req.userId = user.id;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      error: "Authentication failed",
      message: "An unexpected error occurred during authentication",
    });
    return;
  }
};

const verifyJWT = async (token: string) => {
  const decoded = decode(token);
  if (decoded && tokenIsVerified(decoded)) return decoded;
};

const decode = (token: string) => {
  try {
    // Decode the token
    const decoded = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as jwt.JwtPayload;

    return decoded;
  } catch (error: unknown) {
    console.error(
      `Failed to extract JWT token with the provided secret: ${error}`
    );
  }
};

const tokenIsVerified = (decoded: jwt.JwtPayload) => {
  // Check if the token is expired
  // Since 'exp' is in seconds we multiply by 1000 to compare with Date.now()
  const expiration = (decoded.exp || 0) * 1000;
  if (Date.now() > expiration) {
    // The user must refresh their token or log in again
    console.error("Token is expired.");
    return false;
  }
  return true;
};
