#!/bin/bash
set -e

# Terminal Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${CYAN}[INFO]${NC} Gracefully stopping NMS Enterprise Frontend containers..."

docker compose down

echo -e "${GREEN}[SUCCESS]${NC} Application stopped and containers successfully removed."
