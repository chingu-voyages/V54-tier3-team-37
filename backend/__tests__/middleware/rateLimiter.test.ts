import express, { Request, Response } from "express";
import request from "supertest";
import { rateLimit } from "express-rate-limit";
import { REQUESTS_PER_MINUTE } from "../../src/middleware/rateLimiter";

const TOO_MANY_REQUESTS: number = 429;
const ONE_MINUTE: number = 60 * 1000;

describe("rateLimiter middleware", () => {
  let app: express.Express;
  let rateLimiter: ReturnType<typeof rateLimit>;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    app = express();
    // Create a new instance of the rate limiter for each test
    // This will clear the memory cache
    rateLimiter = rateLimit({
      windowMs: ONE_MINUTE,
      max: REQUESTS_PER_MINUTE, // 5 requests
      standardHeaders: "draft-8",
      legacyHeaders: false,
    });

    app.use(rateLimiter);
    app.get("/", (req: Request, res: Response) => {
      res.send("request");
    });
  });

  test(`allows ${REQUESTS_PER_MINUTE} requests per minute`, async () => {
    for (let i = 0; i < REQUESTS_PER_MINUTE; i++) {
      await request(app).get("/").expect(200);
    }
  });

  test(`does not allow more than ${REQUESTS_PER_MINUTE} requests per minute`, async () => {
    for (let i = 0; i < REQUESTS_PER_MINUTE; i++) {
      await request(app).get("/");
    }
    await request(app).get("/").expect(TOO_MANY_REQUESTS);
  });

  test(`allows requests again after a waiting period`, async () => {
    for (let i = 0; i < REQUESTS_PER_MINUTE; i++) {
      await request(app).get("/");
    }
    await request(app).get("/").expect(TOO_MANY_REQUESTS);

    jest.advanceTimersByTime(ONE_MINUTE);

    await request(app).get("/").expect(200);
  });
});
