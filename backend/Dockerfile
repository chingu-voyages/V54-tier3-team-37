# Stage 1: Build stage
FROM node:20 AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.7.0 --activate

# Copy only needed files for install and build
COPY package.json ./
RUN yarn install

# Copy full backend source code
COPY . .


# Generate Prisma client and build the app
RUN yarn dlx prisma generate
RUN yarn build

# Stage 2: Production image
FROM node:20-slim

WORKDIR /app

# Copy only what's needed to run the app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "--max-old-space-size=512", "dist/server.js"]
