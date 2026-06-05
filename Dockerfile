# ================================================================
# Multi-Stage Dockerfile — Oke Emmanuel Olamide Calculator
#
# Stage 1 (tester)  : Node 22 Alpine — runs ESLint + Jest
# Stage 2 (production): nginx Alpine — serves static files
#
# Only the static files reach the final image.
# Node.js, node_modules, and test code are LEFT BEHIND.
# ================================================================

# ── Stage 1: Lint & Test ─────────────────────────────────────
FROM node:22-alpine AS tester

LABEL stage="tester"

WORKDIR /app

# Copy package files first (Docker cache layer — speeds up rebuilds)
COPY package*.json ./

# Install ALL dependencies (including devDependencies: eslint, jest)
RUN npm ci

# Copy only what lint and tests need
COPY .eslintrc.js          ./
COPY assets/js/calculator.js ./assets/js/
COPY tests/                ./tests/

# ── Run ESLint ──────────────────────────────────────────────
RUN echo ">>> Running ESLint..." && npm run lint && echo ">>> Lint passed ✓"

# ── Run Jest ────────────────────────────────────────────────
RUN echo ">>> Running Jest tests..." && npm run test:ci && echo ">>> Tests passed ✓"


# ── Stage 2: Production (nginx) ──────────────────────────────
FROM nginx:alpine AS production

LABEL maintainer="Oke Emmanuel Olamide"
LABEL description="VUNA Calculator — SEN 482 CI/CD Assignment"

# Remove nginx default placeholder page
RUN rm -rf /usr/share/nginx/html/*

# Copy ONLY the static files needed by the browser
COPY index.html               /usr/share/nginx/html/
COPY assets/css/styles.css    /usr/share/nginx/html/assets/css/
COPY assets/js/calculator.js  /usr/share/nginx/html/assets/js/
COPY assets/js/ui.js          /usr/share/nginx/html/assets/js/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx listens on port 80
EXPOSE 80

# Health check — Docker monitors this every 30 seconds
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

# nginx starts automatically — no CMD needed (inherited from nginx:alpine)
