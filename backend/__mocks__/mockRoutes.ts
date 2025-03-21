import { authController } from "../src/controllers/index";

export const invalidRoutes = [
  "/hello-world",
  "/auth/foo-bar",
  "/google-signback",
  "/github/auth",
];

export const authServices = [
  {
    path: "/auth/google/",
    controller: authController.googleSignIn,
    redirectPath: "/mock-google-redirect",
  },
  {
    path: "/auth/github/",
    controller: authController.githubSignIn,
    redirectPath: "/mock-github-redirect",
  },
];

export const callbacks = [
  {
    path: "/google-callback",
    controller: authController.googleCallback,
    mockResponse: "Google callback",
  },
  {
    path: "/github-callback",
    controller: authController.githubCallback,
    mockResponse: "GitHub callback",
  },
];
