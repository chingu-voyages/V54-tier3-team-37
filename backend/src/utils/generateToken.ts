import jwt, { SignOptions } from "jsonwebtoken";

import { APP_NAME } from "../config/index.js";

export const generateToken = ({
  email,
  name,
}: {
  email: string;
  name: string;
}): string => {
  if (!email || !name) {
    throw new Error("missing credentials");
  }
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1d",
    issuer: APP_NAME,
  };
  const token = jwt.sign(
    { id: email, username: name },
    String(process.env.JWT_SECRET),
    options
  );
  return token;
};
