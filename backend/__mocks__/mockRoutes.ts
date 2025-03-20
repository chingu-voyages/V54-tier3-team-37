import { authController } from "../src/controllers/index";

export const invalidRoutes = [
  "/hello-world",
  "/auth/foo-bar",
  "/google-signback",
  "/github/auth",
];

export const authServices = [
  {
    path: "/auth/github/",
    controller: authController.githubSignIn,
    redirectPath: "/mock-github-redirect",
  },
];

export const callbacks = [
  {
    path: "/github-callback",
    controller: authController.githubCallback,
    mockResponse: "GitHub callback",
  },
];
