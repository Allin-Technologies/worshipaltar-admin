# =========================
# BASE IMAGE
# =========================
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat curl
RUN npm install -g pnpm@10

WORKDIR /app


# =========================
# DEPENDENCIES STAGE
# =========================
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install 

# =========================
# BUILD STAGE
# =========================
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG API_BASE_URL
ARG AUTH_SECRET
ENV API_BASE_URL=${API_BASE_URL}
ENV AUTH_SECRET=${AUTH_SECRET}
RUN pnpm run build

# =========================
# FINAL PRODUCTION IMAGE
# =========================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV API_BASE_URL=${API_BASE_URL}
ENV AUTH_SECRET=${AUTH_SECRET}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copy built application and necessary dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
