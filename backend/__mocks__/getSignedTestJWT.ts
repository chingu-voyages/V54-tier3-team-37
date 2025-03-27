import jwt from "jsonwebtoken";

export const JWT_SECRET = "testJWTsecret";

export const getSignedTestJWT = ({ id, email, displayName }) => {
  const expireInOneHour = { expiresIn: 3600 };
  const testToken = jwt.sign(
    { sub: id, email, displayName },
    JWT_SECRET,
    expireInOneHour
  );
  return testToken;
};
