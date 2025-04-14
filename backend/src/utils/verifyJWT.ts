import jwt from "jsonwebtoken";

export const verifyJWT = async (token: string) => {
  const decoded = decode(token);
  if (decoded && tokenIsVerified(decoded)) return decoded;
};

export const decode = (token: string) => {
  console.log("===================");
  console.log("Logging in decode()");
  console.log(`Attempting to verify token: ${token}`);
  try {
    // Decode the token
    const decoded = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as jwt.JwtPayload;
    console.log(`Returning from decode():`);
    console.log(decoded);
    console.log("===================");
    return decoded;
  } catch (error: unknown) {
    console.error(
      `Failed to extract JWT token with the provided secret: ${error}`
    );
  }
};

export const tokenIsVerified = (decoded: jwt.JwtPayload) => {
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
