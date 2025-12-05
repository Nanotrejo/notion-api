# Multi-stage Dockerfile for building and running the TypeScript Notion API
# Comments: production-ready image, builds TypeScript to /dist and runs with Node

FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and tsconfig first for caching
COPY package.json ./
COPY tsconfig.json ./

# Copy source code
COPY src ./src

# Install dependencies (including dev deps needed for tsc)
RUN npm install

# Compile TypeScript
RUN npx tsc -p tsconfig.json

FROM node:20-alpine AS runner
WORKDIR /app

# Install curl for healthchecks
RUN apk add --no-cache curl

# Copy production files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Runtime environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the compiled app
CMD ["node", "dist/index.js"]
