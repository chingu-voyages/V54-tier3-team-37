// Extend default express-session types
import { Session } from "express-session";

export interface GSession extends Session {
  [key: string]: string;
}

// Extend request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {
      // Explicitly list a variable to silence 'no members' warning
      NODE_ENV: "development" | "production";
    }
  }
}
