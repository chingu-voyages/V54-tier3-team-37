import { randomBytes } from "node:crypto";

export const generateRandomHexString = (): string => {
  return randomBytes(32).toString("hex");
};
