# Prompto: Backend Application with Seamless OAuth and Gemini Integration

<p align="center">
  <img src="https://img.shields.io/badge/Node-brightgreen" alt="Node.js Badge"/>
  <img src="https://img.shields.io/badge/Express-black" alt="Express Badge"/>
  <img src="https://img.shields.io/badge/Docker-blue" alt="Docker Badge"/>
  <img src="https://img.shields.io/badge/Prisma-blueviolet" alt="Prisma Badge"/>
  <img src="https://img.shields.io/badge/OAuth2-orange" alt="OAuth2 Badge"/>
  <img src="https://img.shields.io/badge/Gemini-blue" alt="Gemini Badge"/>
</p>

---

## Table of Contents

- [About Project](#about-project)
- [Features](#️features)
- [API specification](#api-specification)
- [Technologies \& Dependencies used](#technologies--dependencies-used)
- [How it works](#how-it-works)
- [Project Setup](#project-setup)
- [Start the application with nodemon](#start-the-application-with-nodemon)
- [Test with Jest](#test-with-jest)
- [Continuous Integration](#continuous-integration)
- [Special Thanks](#special-thanks)
- [Backend developers](#backend-developers)

---

## <a id="about-project"></a>ℹ️ About Project

Prompto is a backend application built to generate high-quality prompts that enable more accurate communication with large language models (LLMs).The goal of Prompto is to help users interact with LLMs more efficiently by providing a Pentagram-format input form, which guides prompt construction and improves the quality of model responses.

Prompto is built using Node.js and Express, containerized with Docker for consistent deployment. It is a backend application that is a part of a full-stack MERN application. PostgreSQL is our database of choice with Prisma ORM for schema modeling and database interactions. The service ensures secure sign-in through the use of authentication functionality provided by Google and GitHub directly, without relying on third-party software. For more technical details for developers, see section _Technologies & Dependencies used_. The app was built by a team of 2, during a 6 week time period, see more in the section _Backend developers_.

---

## <a id="️features"></a>⚙️ Features

| Feature          | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| **Express 5**    | Latest Express 5 framework for robust and scalable APIs.       |
| **Docker**       | Docker containers ensure reliable development and deployment.  |
| **Gemini Flash** | A powerful AI model with low latency and enhanced performance. |
| **OAuth2**       | Google and GitHub OAuth for secure user authentication.        |
| **Prisma ORM**   | An open-source database toolkit for increased productivity.    |
| **Swagger UI**   | For documenting and visualizing RESTful APIs.                  |

---

## <a id="api-specification"></a>💡API specification

Explore the interactive Swagger documentation: [Prompto API](https://v54-tier3-team-37.onrender.com/api-docs/)

---

## <a id="technologies--dependencies-used"></a>📦 Technologies & Dependencies used

- **Authentication:** `googleapis` `@octokit/auth-oauth-app`
- **Session & Security:** `express-session`, `cookie-parser`, `cors`, `express-rate-limit`, `jsonwebtoken`
- **Database & ORM:** PostgreSQL with `prisma` and `@prisma/client`
- **Prompt Generation:** `@google/generative-ai`
- **API & Documentation:** `swagger-jsdoc`, `swagger-ui-express`, `zod`
- **Utility:** `uuid`, `js-yaml`
- **Containerization:** Docker
- **Deployment:** Render
- **Testing:** Jest
- **Code quality:** `husky`, `eslint`

<br>

**dependencies:**

- `@google/generative-ai`
- `@octokit/auth-oauth-app`
- `@prisma/client`
- `cookie-parser`
- `cors`
- `express`
- `express-rate-limit`
- `express-session`
- `googleapis`
- `js-yaml`
- `jsonwebtoken`
- `octokit`
- `swagger-jsdoc`
- `swagger-ui-express`
- `uuid`
- `zod`

**devDependencies** (types are not included):

- `@babel/core`
- `@babel/preset-env`
- `@babel/preset-typescript`
- `@eslint/js`
- `@jest/globals`
- `@octokit/tsconfig`
- `babel-jest`
- `dotenv`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `globals`
- `husky`
- `jest`
- `lint-staged`
- `nodemon`
- `prettier`
- `prisma`
- `supertest`
- `ts-node`
- `typescript`
- `typescript-eslint`

---

## <a id="how-it-works"></a>🔧 How it works

- Upon starting the server, users see a message that confirms that the server has started and is listening.

- Users can authenticate via Google OAuth or GitHub OAuth by navigating to `/auth/google` or `/auth/github`, respectively.
  The OAuth flow is the same for both providers and is as follows:

  1.  A user initiates a sign-in GET request.
  2.  A secure state string is generated on the server and sent to a relevant OAuth provider using an official library.
  3.  Upon successful authentication, the server receives an authorization code, verifies the secure state string, checks received permissions and makes additional calls to the OAuth provider with requests for additional user information, such as user name, email and avatar.
  4.  The server saves user information in the database and sends a signed JWT token to the React frontend.

- Then the user can make requests to `/prompts/generate` to receive enhanced prompts.
  Gemini integration involves these steps:

  1.  A user initiates a POST request with a Pentagram-structured input.
  2.  The server processes the initial input using prompt engineering techniques and sends it to the Gemini API.
  3.  Upon receiving an enhanced prompt, the server sends a follow-up request to get a summary of the prompt.
  4.  Then the prompt is stripped of markdown and sent, along with the summary, to the React frontend.

- From there, the user can do many things, such as:

  1.  Edit the generated prompt.
  2.  Save the prompt for future use.
  3.  Rate the prompt.
  4.  Delete the prompt.
  5.  View generated prompts history.
  6.  Log out of service.

---

## <a id="project-setup"></a>🔌 Project setup

- Clone the repo:

```bash
git clone https://github.com/chingu-voyages/V54-tier3-team-37.git
cd backend
```

- Install dependencies:

```bash
yarn install
```

- Create an `.env` file with the following variables:

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

- Generate Prisma Client to interact with the database:

```bash
yarn prisma generate
```

---

## <a id="start-the-application-with-nodemon"></a> &nbsp;<img src="https://static-00.iconduck.com/assets.00/nodemon-icon-449x512-m36gnbqo.png" alt="Nodemon Logo" width="22"/>&nbsp; Start the application with nodemon

With the following configuration hot reloading with `nodemon` is available. Pay attention to the fact that changes made to the `nodemon` config directly will require restarting the application in order to see the changes.
To start the application, navigate to the backend folder and run:

```bash
yarn start
```

Or, to start the application from the root folder, run:

```bash
yarn workspace backend start
```

---

## <a id="test-with-jest"></a> &nbsp;<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Jest.svg" alt="Jest Logo" width="22"/>&nbsp; Test with Jest

Testing with Jest and TypeScript is enabled.
To run the tests, navigate to the backend folder and run:

```bash
yarn test
```

Or, to run the tests from the root folder, run:

```bash
yarn workspace backend test
```

---

## <a id="continuous-integration"></a> &nbsp;<img src="https://img.icons8.com/ios11/512/FFFFFF/github.png" alt="GitHub Logo" width="30"/>&nbsp; Continuous Integration

To ensure consistent code quality a GitHub workflow is set up.
The workflow checks for linting and type errors, generates prisma and runs tests.

```yaml
# Linting
- run: yarn eslint . --ext .ts,.tsx --max-warnings 0 || exit 1
# Type checking
- run: yarn tsc --noEmit
# Generate prisma and run tests
- run: yarn prisma generate
- run: yarn test
```

---

## <a id="special-thanks"></a>✨ Special Thanks

We as a team would like to thank Chingu platform and community for this opportunity to learn, improve and collaborate. Thank you Chingu!

Chingu is a platform that helps developers and other people in tech related roles practice in-demand skills and accelerate their learning through collaboration and project-building.

Learn more about Chingu platform at https://www.chingu.io/

---

## <a id="backend-developers"></a>🖳 Backend developers

Voyage 54 - team 37, May-April 2025

- Aigul Yermagambetova: [GitHub](https://github.com/aigul-ermak) / [LinkedIn](https://www.linkedin.com/in/aigul-ermak/)

_Key Contributions:_ Docker, Prisma ORM, Gemini API, Swagger UI

- Veronika Kolesnikova: [GitHub](https://github.com/kweeuhree) / [LinkedIn](https://www.linkedin.com/in/vekolesnikova)

_Key Contributions:_ OAuth, project configuration
