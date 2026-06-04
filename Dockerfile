# ============================================================
# Dockerfile — VUNA Calculator
# This file tells Docker how to package your calculator app
# into a container that can run anywhere.
# ============================================================

# Step 1: Start from an official Node.js image (lightweight Alpine Linux)
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files FIRST (Docker caches this layer — speeds up builds)
COPY package*.json ./

# Step 4: Install only production dependencies
RUN npm ci --omit=dev

# Step 5: Copy all your project files into the container
COPY . .

# Step 6: Create a non-root user for security (good practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Step 7: The app runs on port 3000 — tell Docker about this
EXPOSE 3000

# Step 8: Health check — Docker (and your VPS) will monitor this URL
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Step 9: The command to start your app
CMD ["node", "server.js"]
