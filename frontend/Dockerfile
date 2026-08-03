# ==========================================
# Stage 1: Build React SPA
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# context is ./frontend, so package*.json is at the root of that context
COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

# ==========================================
# Stage 2: Serve Static Assets via Nginx
# ==========================================
FROM nginx:1.25-alpine AS runner

# Copy compiled React build to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
