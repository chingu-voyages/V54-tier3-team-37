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
- [Frontend Developers](#frontend-developers)

---

## <a id="about-project"></a>ℹ️ About Project

Prompto is the frontend application designed to be the user interface for interacting with the Prompto backend. Its primary goal is to provide a seamless and intuitive experience for users to generate high-quality prompts for Large Language Models (LLMs) based on the Pentagram framework. The frontend focuses on presenting a clean form for structured input, displaying generated results, and managing prompt history, ensuring users can efficiently create and organize their interactions with AI models.

Prompto is built with **React 19** and **TypeScript**, styled using **Tailwind CSS** for a utility-first approach. It utilizes **React Router v6** for navigation and **Redux Toolkit** for state management, particularly for handling authentication status and managing the prompt generation/history data fetched from the backend. The application is built to be responsive and user-friendly, complementing the backend's powerful prompt generation capabilities. It leverages **Vite** as its build tool for a fast development experience.

---

## <a id="️features"></a>⚙️ Features

| Feature                    | Description                                                                  |
| -------------------------- | ---------------------------------------------------------------------------- |
| **React 19**               | Latest stable React version for enhanced performance and features.           |
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
| **Vite**                   | Fast development server and build tool.                                      |

---

## <a id="live-demo"></a>📺 Live Demo

Explore the live application: [Frontend Live Demo](https://prompto37.com)

---

## <a id="technologies--dependencies-used"></a>📦 Technologies & Dependencies used

**Dependencies:**

- `@hookform/resolvers`: Zod resolver for React Hook Form validation.
- `@radix-ui/*`: Core libraries for Shadcn/ui components (Accordion, Dialog, Dropdown Menu, etc.).
- `@reduxjs/toolkit`: Essential tools for efficient Redux development.
- `@tailwindcss/vite`: Vite plugin for Tailwind CSS.
- `class-variance-authority`: Utility for creating component variants (used by shadcn/ui).
- `clsx`: Tiny utility for conditionally joining class names.
- `embla-carousel-react`: Carousel library for potential use in the UI.
- `lucide-react`: Modern, accessible, and consistent icon library.
- `next-themes`: Context provider for managing dark/light themes (might be used).
- `react`, `react-dom` (**React 19**): Core React libraries.
- `react-hook-form`: Library for managing form state and validation.
- `react-icons`: Another popular icon library (suggests you might use icons from here too).
- `react-redux`: Official React bindings for Redux.
- `react-router-dom`: Declarative routing for React web applications.
- `sonner`: A modern toast library.
- `tailwind-merge`: Utility to confidently merge Tailwind CSS classes without style conflicts.
- `tailwindcss`: The core Tailwind CSS framework.
- `tailwindcss-animate`: Tailwind plugin for CSS animations (used by shadcn/ui).
- `zod`: TypeScript-first schema declaration and validation library.

**DevDependencies:**

- `@babel/*`: Babel presets for compiling React and TypeScript code.
- `@eslint/js`: ESLint core configuration.
- `@testing-library/*`: Libraries for testing React components (DOM, React, User Event, Jest DOM matchers).
- `@types/*`: TypeScript type definitions for various libraries.
- `@vitejs/plugin-react-swc`: Vite plugin for React using SWC for faster builds.
- `autoprefixer`, `postcss`: Tools for processing CSS, including adding vendor prefixes.
- `babel-jest`: Babel integration with Jest.
- `dom-accessibility-api`: Utilities for querying the DOM based on accessibility properties.
- `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: ESLint for code linting and specific React rules.
- `globals`: Provides global variables for ESLint configurations.
- `identity-obj-proxy`: Mocks CSS module imports in Jest tests.
- `jest`, `jest-environment-jsdom`, `ts-jest`: Jest testing framework, JSDOM environment, and TypeScript preprocessor for Jest.
- `prettier`, `prettier-plugin-tailwindcss`: Code formatter and a plugin for sorting Tailwind classes.
- `ts-node`: TypeScript execution environment for Node.js (might be used in scripts or config).
- `typescript`: The TypeScript language.
- `typescript-eslint`: ESLint parser and plugins for TypeScript.
- `vite`: The Vite build tool.

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
- State updates for prompt history (fetching, deleting, rating) are handled via Redux Toolkit async thunks that interact with the backend API using the native `fetch` API.
- Visual feedback for asynchronous operations (loading, errors) and user actions (copying, saving rating) is provided using Sonner toasts.
- Styling is handled using Tailwind CSS, often applied via reusable components from `shadcn/ui`.

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

- Create a `.env` file at the root of the `frontend` directory with the following variable:

| Variable          | Description                               |
| ----------------- | ----------------------------------------- |
| **VITE_BASE_URL** | The base URL of the deployed backend API. |

---

## <a id="start-the-application-with-vite"></a> &nbsp;<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Vite-Light.svg" alt="Vite Logo" width="22"/>&nbsp; Start the application with Vite

To start the application, navigate to the frontend folder and run:

```bash
yarn dev
```

Or, if using Yarn workspaces from the project root, run:

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

Or, if using Yarn workspaces from the project root, run:

```bash
yarn workspace frontend test
```

---

## <a id="frontend-developers"></a>🎨 Frontend developers

Voyage 54 - team 37, May-April 2025

- Brendan Schatzki: [GitHub](https://github.com/BKSchatzki) / [LinkedIn](https://www.linkedin.com/in/bkschatzki)

_Key Contributions:_ Form implementation, component development, styling

- Luis Castillo: [GitHub](https://github.com/LuisCastilloKC) / [LinkedIn](https://www.linkedin.com/in/luis-castillokc/)

_Key Contributions:_ React architecture, Redux Toolkit state management, React Router setup, API integration, testing
