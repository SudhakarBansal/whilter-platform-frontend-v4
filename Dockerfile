FROM --platform=linux/amd64 node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copy package files for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/main/package.json ./apps/main/package.json
# Copy other workspace package.json files if you have dependencies
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile --strict-peer-dependencies=false

# Copy source code
COPY . .

# Build the application
RUN pnpm run build --filter=./apps/main

# Production stage
FROM --platform=linux/amd64 node:20-alpine AS production

# Install pnpm in production stage
RUN npm install -g pnpm

WORKDIR /app

# Copy ALL necessary workspace files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/main/package.json ./
COPY --from=builder /app/apps/main/.next ./.next
COPY --from=builder /app/apps/main/public ./public
COPY --from=builder /app/apps/main/next.config.mjs ./
# Copy other workspace packages if needed
COPY --from=builder /app/packages/ ./packages/

# Install production dependencies
RUN pnpm install --production --strict-peer-dependencies=false

EXPOSE 3000
CMD ["pnpm", "start"]



# Build stage
# FROM --platform=linux/amd64 node:20-alpine AS builder
# FROM node:20-alpine AS builder
# RUN corepack enable && corepack prepare pnpm@latest --activate
# WORKDIR /app

# # Copy manifests
# COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# COPY apps/main/package.json ./apps/main/package.json
# COPY packages/ ./packages/

# # Install and build
# RUN pnpm install --frozen-lockfile
# COPY . .
# RUN pnpm run build --filter=./apps/main

# # Production stage
# # FROM --platform=linux/amd64 node:20-alpine AS builder
# FROM node:20-alpine AS production
# ENV NODE_ENV=production
# WORKDIR /app

# # Copy only necessary files
# COPY --from=builder /app/apps/main/.next ./.next
# COPY --from=builder /app/apps/main/public ./public
# COPY --from=builder /app/apps/main/next.config.mjs ./
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/pnpm-lock.yaml ./
# COPY --from=builder /app/pnpm-workspace.yaml ./
# COPY --from=builder /app/packages ./packages

# # Re-install production dependencies
# RUN corepack enable && corepack prepare pnpm@latest --activate
# RUN pnpm install --prod --frozen-lockfile

# EXPOSE 3000

# # 👇 Run the app from apps/main
# CMD ["pnpm", "--filter", "./apps/main", "start"]
