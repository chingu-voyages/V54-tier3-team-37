import { rateLimit } from "express-rate-limit";

// This rate limiter is using the in-memory store solution
export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 60, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: JSON.stringify("Too many requests. Try again in a minute."),
});
