// env.ts
import { z } from "zod";

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  DATABASE_URL: z.string().url(),
  HOME_REACT_ADDRESS: z.string().url(),
  GITHUB_CLIENT_ID: z.string().min(10),
  GITHUB_CLIENT_SECRET: z.string().min(10),
  GOOGLE_CLIENT_ID: z.string().min(20),
  GOOGLE_CLIENT_SECRET: z.string().min(10),
  JWT_SECRET: z.string().min(10),
  SESSION_SECRET: z.string().min(10),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
  // ...
});

// Validate `process.env` against our schema
// and return the result
const env = envSchema.parse(process.env);

// Export the result so we can use it in the project
export default env;
