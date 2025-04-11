# Prompto (Chingu Voyage 54 Team 37)
<p align="center">
  <img width="600" src="./assets/frontpage.png" alt="Landing page"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node-43853D?style=flat&logo=node.js&logoColor=white" alt="Node.js Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat&logo=yarn&logoColor=white" alt="Yarn Badge"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white" alt="Jest Badge"/>
  <img src="https://img.shields.io/badge/Zod-8E44AD?style=flat" alt="Zod Badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite Badge"/>
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind Badge"/>
  <img src="https://img.shields.io/badge/ReduxToolkit-764ABC?style=flat&logo=redux&logoColor=white" alt="Redux Toolkit Badge"/>
  <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=flat" alt="React Hook Form Badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" alt="Express Badge"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker Badge"/>
  <img src="https://img.shields.io/badge/Prisma-0C344B?style=flat&logo=prisma&logoColor=white" alt="Prisma Badge"/>
  <img src="https://img.shields.io/badge/OAuth2-F29400?style=flat" alt="OAuth2 Badge"/>
  <img src="https://img.shields.io/badge/Gemini-5C6BC0?style=flat" alt="Gemini Badge"/>
</p>

## Table of Contents

- [Description](#description)
- [Current Status](#current-status)
- [Features](#️features)
- [Technologies Used](#technologies-used)
- [Required Services](#required-services)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Build Instructions](#build-instructions)
- [Deployment Checklist](#deployment-checklist)
- [Special Thanks](#special-thanks)
- [Contributing](#contributing)
- [License](#license)
- [Team Members](#team-members)

---

## Description

Prompto is a full-stack application built to generate high-quality prompts that enable more accurate communication with large language models (LLMs).The goal of Prompto is to help users interact with LLMs more efficiently by providing a Pentagram-format input form, which guides prompt construction and improves the quality of model responses.

## Current Status

The application is available online if accessed through Google Chrome or Mozilla Firefox with third-party cookies enabled.

- Deployment challenge

We have encountered a challenge involving third-party cookies and how Netlify is processing them. We learnt that `.netlify.app` is on [Mozilla Public Suffix List](!https://publicsuffix.org/), which means that cookies set by our server will not be attached to subsequent requests. We have opted to send our authentication token in the headers instead of cookies due to the aforementioned circumstances.

## Features

- Feature 1: Prompt engineering.
- Feature 2: Prompt history.
- Feature 3: User authentication.

## Technologies Used

- `@google/generative-ai`
- `@octokit/auth-oauth-app`
- `@prisma/client`
- `@radix-ui/*`
- `@reduxjs/toolkit`
- `@tailwindcss`
- `clsx`
- `cookie-parser`
- `cors`
- `eslint`
- `express`
- `express-rate-limit`
- `express-session`
- `googleapis`
- `jest`
- `js-yaml`
- `jsonwebtoken`
- `octokit`
- `playwright`
- `prettier`
- `react`
- `react-dom`
- `react-hook-form`
- `react-redux`
- `react-router-dom`
- `sonner`
- `swagger-jsdoc`
- `swagger-ui-express`
- `ts-node`
- `typescript`
- `uuid`
- `vite`
- `zod`

## Required Services

- **Netlify** – React frontend deployment
- **Render** – Backend deployment via Docker
- **Neon** – PostgreSQL database location
- **Prisma** – Database management
- **Google OAuth** – OAuth provider setup
- **GitHub OAuth** – OAuth provider setup
- **Google Gemini Flash** – LLM integration for prompt engineering
- **GitHub Actions** – CI pipeline

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chingu-voyages/V54-tier3-team-37.git
   ```

2. Install dependencies:

  ```bash
  yarn install
  ```

## Configuration

1. Create `.env` files in both frontend/ and backend/ directories
2. Add required environment variables:

  Backend `.env`:
  | Variable                 | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| **PORT**                 | The port number on which the Express server will run.                    |
| **DATABASE_URL**         | Connection string for the database used by Prisma ORM.                   |
| **HOME_REACT_ADDRESS**   | Comma-separated URLs of the frontend app (productionUrl,developmentUrl). |
| **GITHUB_CLIENT_ID**     | GitHub OAuth application's client ID.                                    |
| **GITHUB_CLIENT_SECRET** | GitHub OAuth application's client secret.                                |
| **GOOGLE_CLIENT_ID**     | Google OAuth application's client ID.                                    |
| **GOOGLE_CLIENT_SECRET** | Google OAuth application's client secret.                                |
| **GEMINI_API_KEY**       | API key for accessing the Google Gemini model.                           |
| **JWT_SECRET**           | Secret used to sign JSON Web Tokens for session management.              |
| **SESSION_SECRET**       | Secret used for secure OAuth state handling.                             |
| **NODE_ENV**             | Sets the environment mode: `development`, `production`, or `test`.       |

Frontend `.env`:
  | Variable                 | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| **VITE_API_BASE_URL**    | The URL of the backend server.                                           |
<br>
3. Generate Prisma Client to interact with the database:

```bash
yarn workspace backend prisma generate
```

## Usage

Run front end dev server (`http://localhost:5173`):

```bash
yarn workspace frontend dev
```

Run back end dev server (`http://localhost:8000`):

```bash
yarn workspace backend start
```

## Build Instructions

To build the project for production, build the frontend application:

```bash
yarn run build
```

Build the backend application:
```bash
docker run build
```

## Deployment Checklist

### Below example taken from [Brendan](https://github.com/BKSchatzki)'s [project](https://github.com/BKSchatzki/partyroombloom).

- Vercel Build and Deployment Settings:
  - Framework Settings is set to Next.js defaults:
    - Build Command: `npm run build` or `next build`
    - Output Directory: Next.js default
    - Install Command: `yarn install`, `pnpm install`, `npm install`, or `bun install`
    - Development Command: `next`
  - Root directory field is empty
  - Node.js version is 20.x
- Environment Variables all filled in Vercel Project Settings, especially note:
  - Your PostgreSQL database URL
  - Your OpenAI API key
  - The Client ID and secret in your created application on GCP, found on the same page as the authorized origins and URIs (below)
- Application created in GCP, with OAuth 2.0 Client ID:
  - Authorized JavaScript origins:
    - <http://localhost:3000>
    - The subdomain at <https://project-name.vercel.app>
    - Any domains on which you are hosting the site
  - Authorized redirect URIs should have the following paths for each of the Authorized JavaScript Origins:
    - /api/auth/callback/google
    - /login/google/callback

## Contributing

You know the drill:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Team Members

- Product Owner:
  - Sarita Jha: [GitHub](https://github.com/Sarita1517) / [LinkedIn](https://www.linkedin.com/in/jha-sarita/)
- Scrum Master:
  - Xochitl Farias: [GitHub](https://github.com/xochfa) / [LinkedIn](https://www.linkedin.com/in/xfarias-scrum-master/)
  - Steffi Saint-Pierre: [GitHub](https://github.com/stefley1509) / [LinkedIn](https://www.linkedin.com/in/steffisp)
- UI/UX Designer:
  - Trupti Shikhare: [GitHub](https://github.com/truptishikhare) / [LinkedIn](https://www.linkedin.com/in/truptishikhare/)
- Web Developer:
  - Aigul Yermagambetova: [GitHub](https://github.com/aigul-ermak) / [LinkedIn](https://www.linkedin.com/in/aigul-ermak/)
  - Brendan K. Schatzki: [GitHub](https://github.com/BKSchatzki) / [LinkedIn](https://www.linkedin.com/in/bkschatzki)
  - Luis Castillo: [GitHub](https://github.com/LuisCastilloKC) / [LinkedIn](https://www.linkedin.com/in/luis-castillokc/)
  - Veronika Kolesnikova: [GitHub](https://github.com/kweeuhree) / [LinkedIn](https://www.linkedin.com/in/vekolesnikova)
