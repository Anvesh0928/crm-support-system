# ==========================================
# Stage 1: Build Stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build TypeScript
COPY tsconfig.json ./
COPY src/ ./src
RUN npm run build

# Prune devDependencies to reduce final container footprint
RUN npm prune --production

# ==========================================
# Stage 2: Production Runner Stage
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Security Hardening: Run as non-root user
USER node

# Copy production node_modules and compiled dist from builder stage
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "dist/server.js"]
