import { rateLimit } from "express-rate-limit";

export const REQUESTS_PER_MINUTE = 5;

// This rate limiter is using the in-memory store solution
// Should the limit be exhausted, it sends 429 by default
export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: REQUESTS_PER_MINUTE, // Limit each IP to 5 requests per `window` (here, per 1 minute).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: JSON.stringify("Too many requests. Try again in a minute."),
});
