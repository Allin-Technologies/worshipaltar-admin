# # =========================
# # BASE IMAGE
# # =========================
# FROM node:20-alpine AS base

# # Install libc6-compat for compatibility and manually install PNPM
# RUN apk add --no-cache libc6-compat curl \
#     && npm install -g pnpm

# # =========================
# # DEPENDENCIES STAGE
# # =========================
# FROM base AS deps

# WORKDIR /app

# # Copy package.json and lock files for dependency installation
# COPY package.json pnpm-lock.yaml ./

# # Install all dependencies
# RUN pnpm install --force
# # =========================
# # BUILD STAGE
# # =========================
# FROM base AS builder

# WORKDIR /app

# # Copy node_modules from the deps stage
# COPY --from=deps /app/node_modules ./node_modules

# # Copy the application source code
# COPY . .

# # Define build-time arguments (e.g., API keys, environment URLs, etc.)
# ARG API_BASE_URL
# ARG AUTH_SECRET

# # Set environment variables for the build stage
# ENV API_BASE_URL=$BASE_URL
# ENV AUTH_SECRET=$AUTH_SECRET

# # Run the build command
# RUN pnpm run build

# # =========================
# # FINAL PRODUCTION IMAGE
# # =========================
# FROM node:20-alpine AS runner

# # Install libc6-compat for compatibility and manually install PNPM
# RUN apk add --no-cache libc6-compat curl \
#     && npm install -g pnpm

# WORKDIR /app

# # Set runtime environment variables
# ENV NODE_ENV=production
# ENV API_BASE_URL=$API_BASE_URL
# ENV AUTH_SECRET=$AUTH_SECRET


# # Create and use a non-root user for security
# RUN addgroup --system --gid 1001 nodejs \
#     && adduser --system --uid 1001 nextjs

# # Copy public and build artifacts from the builder stage
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# # Change to the non-root user
# USER nextjs

# # Expose the app's port
# EXPOSE 3001

# # Set environment variables (runtime)
# ENV PORT=3001
# ENV HOSTNAME="0.0.0.0"

# # Start the Next.js server
# CMD ["node", "server.js"]


# =========================
# BASE IMAGE
# =========================
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat curl \
    && npm install -g pnpm@8.9.0

# =========================
# DEPENDENCIES STAGE
# =========================
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Use --force to bypass dependency conflicts
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
ARG PUBLIC_DOMAIN_URL
ENV API_BASE_URL=${API_BASE_URL}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV PUBLIC_DOMAIN_URL=${PUBLIC_DOMAIN_URL}
RUN pnpm run build

# =========================
# FINAL PRODUCTION IMAGE
# =========================
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production
ENV API_BASE_URL=${API_BASE_URL}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV PUBLIC_DOMAIN_URL=${PUBLIC_DOMAIN_URL}

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy built application and necessary dependencies
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "start"]
