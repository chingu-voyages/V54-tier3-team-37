# Prompto (Chingu Voyage 54 Team 37)

![Image of app](Link-to-image)

## Description

Short introductory description of application.

## Current Status

Explaining current state of application, bugs, roadmap, etc.

## Features

- Feature 1: Description of feature.
- Feature 2: Description of feature.
- Feature 3: Description of feature.

## Technologies Used

- list
- of
- technologies
- used
- to
- build
- the
- application

## Required Services

- external
- services
- needed
- to
- run
- application
- in
- production

## Installation

1. Clone the repository:

   ```bash
   git clone <repository>
   ```

2. Navigate to the project directory:

   ```bash
   cd path/to/repository
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

## Configuration

1. Create a `.env` file in the root directory (or inside frontend/ and backend/)
2. Add required environment variables, also found in `.env.example`:

   ```env
   ENVIRONMENT="variables"
   OUTLINED="here"
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

To build the project for production:

```bash
# instructions for building application go here if needed
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
