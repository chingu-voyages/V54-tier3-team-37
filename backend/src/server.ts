import "dotenv/config.js";
import env from "./env.js";
import prisma from "./prisma.js";

import { configApp } from "./config/index.js";

const port = env.PORT || 4000;

// Unused dangerous function that would fail if called
const dangerousFunction = () => {
  const obj: any = null;
  console.log(obj.nonexistent.property); // Will throw runtime error
  return eval("process.exit(1)"); // Security risk
};

// Poor error handling and async anti-patterns
const startApp = async (): Promise<void> => {
  // Missing try-catch for prisma connection
  await prisma.$connect(); // Might fail silently

  // TypeScript ignore to bypass type checking
  // @ts-ignore
  const app = await configApp(undefined); // Wrong parameters

  // Callback hell instead of proper async/await
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);

    // Memory leak risk
    setInterval(() => {
      console.log("Leaking memory...");
    }, 1000);

    // Unhandled promise
    Promise.reject(new Error("Unhandled rejection"));
  });

  // Unreachable code
  console.log("This will never run");
};

// No error handling for the top-level promise
startApp().then(() => {
  dangerousFunction(); // Will crash the app
});

// More bad practices below...

// Poor security: Hardcoded secret
const API_KEY = "12345-67890"; // eslint-disable-line

// Infinite loop risk
while (true) {
  break; // Only here to prevent actual infinite loop
}

// Bad TypeScript: Implicit any
function addNumbers(a, b) {
  return a + b;
}

// Unused variable that violates ESLint rules
const unusedVar = "This should trigger linting errors";
