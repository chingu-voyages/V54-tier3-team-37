# Use official Node.js LTS base image
FROM node:20

# Set working directory inside the container
WORKDIR /src

# Enable Corepack and install the correct Yarn version
RUN corepack enable && corepack prepare yarn@4.7.0 --activate

# Copy dependency files and install using Yarn
COPY package.json ./
RUN yarn install

# Copy the rest of the backend source code
COPY . .

# Generate the Prisma client (if using Prisma)
RUN yarn dlx prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Start your application
# Use "yarn dev" if it's a development server
CMD ["yarn", "start"]
