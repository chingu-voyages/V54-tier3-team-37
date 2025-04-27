# Prompto: Frontend Application for Effortless Prompt Generation

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" alt="React Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06SCF?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge"/>
  <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat&logo=redux&logoColor=white" alt="Redux Toolkit Badge"/>
  <img src="https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=react-router&logoColor=white" alt="React Router Badge"/>
</p>

---

## Table of Contents

- [About Project](#about-project)
- [Features](#️features)
- [Live Demo](#live-demo)
- [Technologies & Dependencies used](#technologies--dependencies-used)
- [How it works](#how-it-works)
- [Project Setup](#project-setup)
- [Start the application with Vite](#start-the-application-with-vite)
- [Test with Jest & React Testing Library](#test-with-jest--react-testing-library)
- [Continuous Integration](#continuous-integration)
- [Backend Developers](#backend-developers) <!-- Keeping this link as it refers to the backend team -->
- [Frontend Developers](#frontend-developers)

---

## <a id="about-project"></a>ℹ️ About Project

Prompto is the frontend application designed to be the user interface for interacting with the Prompto backend. Its primary goal is to provide a seamless and intuitive experience for users to generate high-quality prompts for Large Language Models (LLMs) based on the Pentagram framework. The frontend focuses on presenting a clean form for structured input, displaying generated results, and managing prompt history, ensuring users can efficiently create and organize their interactions with AI models.

Prompto is built with React and TypeScript, styled using Tailwind CSS for a utility-first approach. It utilizes React Router for navigation and Redux Toolkit for state management, particularly for handling authentication status and managing the prompt generation/history data fetched from the backend. The application is built to be responsive and user-friendly, complementing the backend's powerful prompt generation capabilities.

---

## <a id="️features"></a>⚙️ Features

| Feature                    | Description                                                                  |
| -------------------------- | ---------------------------------------------------------------------------- |
| **React 18+**              | Modern React framework for a declarative and component-based UI.             |
| **TypeScript**             | Strong typing for improved code reliability and developer experience.        |
| **Tailwind CSS**           | Utility-first CSS framework for rapid and consistent styling.                |
| **Redux Toolkit**          | Simplified Redux state management for auth and prompt data.                  |
| **React Router v6**        | Declarative routing for navigation within the application.                   |
| **React Hook Form**        | Performant and flexible form management with Zod for validation.             |
| **Shadcn/ui**              | Reusable UI components built with Radix UI and Tailwind CSS.                 |
| **Sonner**                 | Beautifully designed toasts for user feedback.                               |
| **Web Speech API (POC)**   | Initial proof-of-concept integration for speech-to-text input (Browser API). |
| **Responsive Design**      | Adapts layout and styling for optimal viewing across various devices.        |
| **Client-side Routing**    | Fast and seamless page transitions without full page reloads.                |
| **Prompt Generation Form** | Intuitive form based on the Pentagram framework for structured input.        |
| **Prompt History View**    | Displays saved prompts with details, rating, copy, edit, and delete options. |
| **Authentication Flow**    | Integrates with backend OAuth for secure access to protected routes.         |
| **Loading & Error States** | Provides clear visual feedback during data fetching and on errors.           |

---

## <a id="live-demo"></a>📺 Live Demo

Explore the live application: [Frontend Live Demo](https://YOUR_FRONTEND_DEPLOYMENT_URL_HERE.netlify.app/)

**(Note: Replace `YOUR_FRONTEND_DEPLOYMENT_URL_HERE.netlify.app` with your actual deployed frontend URL.)**

---

## <a id="technologies--dependencies-used"></a>📦 Technologies & Dependencies used

- **UI Framework:** `react`, `react-dom`
- **Styling:** `tailwindcss`, `postcss`, `autoprefixer`
- **State Management:** `@reduxjs/toolkit`, `react-redux`
- **Routing:** `react-router-dom`
- **Form Management & Validation:** `react-hook-form`, `zod`, `@hookform/resolvers/zod`
- **UI Components:** `@radix-ui/*` (via shadcn/ui), various `@/components/ui/*`
- **Icons:** `lucide-react`
- **Toasts:** `sonner`
- **Utility:** `clsx`, `tailwind-merge`, `@/lib/cn.ts`, `@/utils/formatDate.ts`, `@/utils/getCookie.ts`, `@/utils/pentagramField.ts`
- **API Interaction:** `fetch` (native browser API)
- **Development:** `vite`, `@vitejs/plugin-react`
- **Testing:** `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `babel-jest`, `identity-obj-proxy`, `@types/dom-speech-recognition`
- **Code Quality:** `eslint`, `prettier`, `husky`, `lint-staged`
- **TypeScript:** `typescript`, `@types/react`, `@types/react-dom`, `@types/jest`

<br>

**dependencies:**

- `@hookform/resolvers/zod`
- `@lucide/react`
- `@radix-ui/react-accordion`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-avatar`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-label`
- `@radix-ui/react-select`
- `@radix-ui/react-separator`
- `@radix-ui/react-slot`
- `@radix-ui/react-slider`
- `@radix-ui/react-tooltip`
- `@reduxjs/toolkit`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `react`
- `react-dom`
- `react-hook-form`
- `react-redux`
- `react-router-dom`
- `sonner`
- `tailwind-merge`
- `tailwindcss-animate`
- `zod`

**devDependencies:**

- `@testing-library/jest-dom`
- `@testing-library/react`
- `@testing-library/user-event`
- `@types/dom-speech-recognition`
- `@types/jest`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `@vitejs/plugin-react`
- `autoprefixer`
- `babel-jest`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `identity-obj-proxy`
- `jest`
- `jest-environment-jsdom`
- `postcss`
- `prettier`
- `prettier-plugin-tailwindcss`
- `ts-jest`
- `typescript`
- `vite`

---

## <a id="how-it-works"></a>🔧 How it works

- The application is a Single Page Application (SPA) powered by React and React Router for navigation.
- Authentication state (`isLoggedIn`, `user`, `isLoading`) is managed globally using Redux Toolkit.
- The `AuthWrapper` component fetches the current user on application load to determine the initial authentication state.
- `PrivateRoute` components protect routes that require authentication, redirecting unauthenticated users to the login page (`/auth`) while preserving the intended destination in the navigation state.
- The homepage (`/`) showcases the application's value proposition with a "Get Started" button that navigates to `/auth` or `/dashboard` based on the user's login status.
- The `/auth` page provides the interface for users to authenticate via the backend's OAuth flow (Google/GitHub). Upon successful login, the user is redirected back to the page they originally intended to visit or to the dashboard (`/dashboard`) if they navigated directly to `/auth`.
- The `/dashboard` route acts as a layout container for authenticated features, including the Prompt Generation and Prompt History pages. Navigating directly to `/dashboard` redirects to `/dashboard/history`.
- The Prompt Generation page (`/dashboard/generate`) uses React Hook Form with Zod validation for structured input based on the Pentagram format.
- Speech-to-Text input (Proof-of-Concept) is integrated using the Web Speech API via the `SpeechInputButton` component, allowing users to dictate into form fields directly within the browser.
- The Prompt History page (`/dashboard/history`) fetches the user's saved prompts from the backend and displays them in an expandable list. Each prompt includes details, rating, copy, edit, and delete options.
- State updates for prompt history (fetching, deleting, rating) are handled via Redux Toolkit async thunks that interact with the backend API.
- Visual feedback for asynchronous operations (loading, errors) and user actions (copying, saving rating) is provided using Sonner toasts.

---

## <a id="project-setup"></a>🔌 Project setup

- Clone the repo:

```bash
git clone https://github.com/chingu-voyages/V54-tier3-team-37.git
cd frontend
```

- Install dependencies:

```bash
yarn install
```

- Create a `.env` file with the following variable:

| Variable          | Description                               |
| ----------------- | ----------------------------------------- |
| **VITE_BASE_URL** | The base URL of the deployed backend API. |

**(Note: Replace `yarn install` with `npm install` or `pnpm install` if you are not using Yarn workspaces.)**

---

## <a id="start-the-application-with-vite"></a> &nbsp;<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Vite-Light.svg" alt="Vite Logo" width="22"/>&nbsp; Start the application with Vite

To start the application, navigate to the frontend folder and run:

```bash
yarn dev
```

Or, to start the application from the root folder (if using Yarn workspaces), run:

```bash
yarn workspace frontend dev
```

---

## <a id="test-with-jest--react-testing-library"></a> &nbsp;<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Jest.svg" alt="Jest Logo" width="22"/>&nbsp; Test with Jest & React Testing Library

Testing with Jest and React Testing Library is configured for component and Redux slice testing.

To run the tests, navigate to the frontend folder and run:

```bash
yarn test
```

Or, to run the tests from the root folder (if using Yarn workspaces), run:

```bash
yarn workspace frontend test
```

---

## <a id="continuous-integration"></a> &nbsp;<img src="https://img.icons8.com/ios11/512/FFFFFF/github.png" alt="GitHub Logo" width="30"/>&nbsp; Continuous Integration

A GitHub workflow is set up to ensure code quality and test coverage on pushes and pull requests.

The workflow typically includes:

```yaml
# Example steps (adjust based on actual workflow)
# Install dependencies
# Linting (ESLint)
# Type checking (TypeScript)
# Run tests (Jest)
```

---

## <a id="backend-developers"></a>🖳 Backend developers

Voyage 54 - team 37, May-April 2025

- Aigul Yermagambetova: [GitHub](https://github.com/aigul-ermak) / [LinkedIn](https://www.linkedin.com/in/aigul-ermak/)

_Key Contributions:_ Docker, Prisma ORM, Gemini API, Swagger UI

- Veronika Kolesnikova: [GitHub](https://github.com/kweeuhree) / [LinkedIn](https://www.linkedin.com/in/vekolesnikova)

_Key Contributions:_ OAuth, project configuration

---

## <a id="frontend-developers"></a>🎨 Frontend developers

Voyage 54 - team 37, May-April 2025

- Brendan Schatzki: [GitHub](https://github.com/YOUR_GITHUB_HANDLE) / [LinkedIn](https://www.linkedin.com/in/YOUR_LINKEDIN_URL)

_Key Contributions:_ React architecture, Redux Toolkit state management, React Router setup, Form implementation (React Hook Form/Zod), Component development (Hero, Dashboard, PromptGenForm, PromptHistory, SpeechInputButton, etc.), API integration (fetch), Testing (Jest/React Testing Library), Styling (Tailwind CSS/shadcn/ui)

**(Note: Replace `YOUR_GITHUB_HANDLE` and `YOUR_LINKEDIN_URL` with your actual GitHub handle and LinkedIn profile URL.)**
