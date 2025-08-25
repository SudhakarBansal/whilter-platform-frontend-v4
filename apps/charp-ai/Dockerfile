FROM --platform=linux/amd64 node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copy package files for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/charp-ai/package.json ./apps/charp-ai/package.json
# Copy other workspace package.json files if you have dependencies
COPY packages/ ./packages/

RUN pnpm install --frozen-lockfile --strict-peer-dependencies=false

# Copy source code
COPY . .

# Build the application
RUN pnpm run build --filter=./apps/charp-ai

# Production stage
FROM --platform=linux/amd64 node:20-alpine AS production

# Install pnpm in production stage
RUN npm install -g pnpm

WORKDIR /app

# Copy ALL necessary workspace files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/charp-ai/package.json ./
COPY --from=builder /app/apps/charp-ai/.next ./.next
COPY --from=builder /app/apps/charp-ai/public ./public
COPY --from=builder /app/apps/charp-ai/next.config.mjs ./
# Copy other workspace packages if needed
COPY --from=builder /app/packages/ ./packages/

# Install production dependencies
RUN pnpm install --production --strict-peer-dependencies=false

EXPOSE 3000
CMD ["pnpm", "start"]
