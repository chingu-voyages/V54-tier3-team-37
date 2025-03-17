import jwt, { SignOptions } from "jsonwebtoken";

import { GOOGLE_CLIENT_ID } from "../config/index.ts";

export const generateToken = ({
  email,
  name,
}: {
  email: string;
  name: string;
}): string => {
  const options: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1d",
    issuer: "AIHelper",
    audience: GOOGLE_CLIENT_ID,
  };
  const token = jwt.sign(
    { id: email, username: name },
    String(process.env.JWT_SECRET),
    options
  );
  return token;
};
