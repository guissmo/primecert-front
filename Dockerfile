# Stage 1: Build the Svelte app
FROM node:20 AS build

# Set the working directory
WORKDIR /app

ARG PUBLIC_BASE_API_URL
ENV PUBLIC_BASE_API_URL $PUBLIC_BASE_API_URL

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=6969

CMD [ "node", "build" ]