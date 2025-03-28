import jwt, { SignOptions } from "jsonwebtoken";

import { APP_NAME } from "../config/index.js";
import { User } from "../types/index.js";

export const generateToken = ({ email, displayName, id }: User): string => {
  if (!email || !displayName || !id) {
    throw new Error("missing credentials");
  }
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1d",
    issuer: APP_NAME,
  };
  const token = jwt.sign(
    { sub: id, email, displayName },
    String(process.env.JWT_SECRET),
    options
  );
  return token;
};
