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

## ⚙️ Features

| Feature          | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| **Express 5**    | Latest Express 5 framework for robust and scalable APIs.       |
| **Docker**       | Docker containers ensure reliable development and deployment.  |
| **Gemini Flash** | A powerful AI model with low latency and enhanced performance. |
| **OAuth2**       | Google and GitHub OAuth for secure user authentication.        |
| **Prisma ORM**   | An open-source database toolkit for increased productivity.    |
| **Swagger UI**   | For documenting and visualizing RESTful APIs.                  |

---

### 💡API specification

See an interactive Swagger documentation: [Prompto API](https://v54-tier3-team-37.onrender.com/api-docs/)

---

### 🔍 Project Setup

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

| Variable                 | Description                                                               |
| ------------------------ | ------------------------------------------------------------------------- |
| **PORT**                 | The port number on which the Express server will run.                     |
| **DATABASE_URL**         | Connection string for the database used by Prisma ORM.                    |
| **HOME_REACT_ADDRESS**   | Comma-separated URLs of the frontend app (productionUrl,developementUrl). |
| **GITHUB_CLIENT_ID**     | GitHub OAuth application's client ID.                                     |
| **GITHUB_CLIENT_SECRET** | GitHub OAuth application's client secret.                                 |
| **GOOGLE_CLIENT_ID**     | Google OAuth application's client ID.                                     |
| **GOOGLE_CLIENT_SECRET** | Google OAuth application's client secret.                                 |
| **GEMINI_API_KEY**       | API key for accessing the Google Gemini model.                            |
| **JWT_SECRET**           | Secret used to sign JSON Web Tokens for session management.               |
| **SESSION_SECRET**       | Secret used for secure OAuth state handling.                              |
| **NODE_ENV**             | Sets the environment mode: `development`, `production`, or `test`.        |

---

### &nbsp;<img src="https://static-00.iconduck.com/assets.00/nodemon-icon-449x512-m36gnbqo.png" alt="Nodemon Logo" width="22"/>&nbsp; Start the application with nodemon

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

### &nbsp;<img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Jest.svg" alt="Jest Logo" width="22"/>&nbsp; Test with Jest

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

## 🖳 Backend developers

- Aigul Yermagambetova: [GitHub](https://github.com/aigul-ermak) / [LinkedIn](https://www.linkedin.com/in/aigul-ermak/)
- Veronika Kolesnikova: [GitHub](https://github.com/kweeuhree) / [LinkedIn](https://www.linkedin.com/in/vekolesnikova)
