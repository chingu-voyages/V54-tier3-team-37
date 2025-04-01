import { z } from "zod";

// Define the schema as an object with all of the env
// variables and their types
export const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  DATABASE_URL: z.string().url(),
  HOME_REACT_ADDRESS: z
    .string()
    .regex(
      /^(https?:\/\/[^\s,]+)(?:,http?:\/\/[^\s,]+)?$/,
      "Must be a valid URL or comma-separated URLs"
    ),
  GITHUB_CLIENT_ID: z.string().startsWith("Ov").min(10),
  GITHUB_CLIENT_SECRET: z.string().min(10),
  GOOGLE_CLIENT_ID: z.string().includes(".apps.googleusercontent.com"),
  GOOGLE_CLIENT_SECRET: z.string().min(10),
  GEMINI_API_KEY: z.string().min(10),
  JWT_SECRET: z.string().min(10),
  SESSION_SECRET: z.string().min(15),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

// Validate `process.env` against our schema
// and return the result
// Throws an error if an environment variable is missing
const env = envSchema.parse(process.env);

// Export the result so we can use it in the project
export default env;
