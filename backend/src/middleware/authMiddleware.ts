import { Request, Response, NextFunction } from "express";

import { verifyJWT } from "../utils/verifyJWT.js";
import { getUserById } from "../controllers/userController.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the token from cookies or headers
  const token =
    req.cookies.token ??
    (req.headers.authorization &&
      extractHeaderToken(req.headers.authorization));

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
    const user = await getUserById(String(verifiedToken.sub));
    if (!user) {
      res.status(404).json({ error: "User not found" });
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

const extractHeaderToken = (authorization: string) => {
  const [bearer, token] = authorization.split(" ");
  if (bearer.trim() !== "Bearer") return;
  return token;
};
