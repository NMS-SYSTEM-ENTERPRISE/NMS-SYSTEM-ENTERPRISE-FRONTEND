#!/bin/bash
set -e

# Terminal Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${CYAN}[INFO]${NC} Initiating deployment sequence for NMS Enterprise Frontend..."

# --- OFFLINE INSTALLATION SUPPORT ---
# If the user has a pre-built image tarball, load it automatically!
if [ -f "nms-frontend-image.tar" ]; then
  echo -e "${CYAN}[INFO]${NC} Offline image tarball detected. Loading image into Docker (this may take a minute)..."
  docker load -i nms-frontend-image.tar
  echo -e "${GREEN}[SUCCESS]${NC} Offline image loaded successfully."
fi

# Ensure we have a valid .env if not we can just copy example
if [ ! -f .env ]; then
  echo -e "${YELLOW}[WARN]${NC} .env file not found, creating from .env.example..."
  cp .env.example .env 2>/dev/null || true
fi

# Bring up docker-compose.
# If Dockerfile is present, we build from source.
# If Dockerfile is missing (offline mode), we just start the pre-loaded image.
if [ -f "Dockerfile" ]; then
  echo -e "${CYAN}[INFO]${NC} Source code detected. Building and starting Docker image..."
  docker compose up -d --build
else
  echo -e "${CYAN}[INFO]${NC} Starting containers from pre-loaded image..."
  docker compose up -d
fi

echo -e "${GREEN}[SUCCESS]${NC} Containers started successfully!"

# Extract port from .env if available, otherwise default to 3000
PORT=$(grep '^PORT=' .env 2>/dev/null | cut -d '=' -f2 || echo 3000)

echo -e "${GREEN}[SUCCESS]${NC} The application should now be accessible in your browser at:"
echo -e "${CYAN}         http://localhost:${PORT}${NC}"
echo -e "${CYAN}[INFO]${NC} To view live logs, run: docker compose logs -f"
