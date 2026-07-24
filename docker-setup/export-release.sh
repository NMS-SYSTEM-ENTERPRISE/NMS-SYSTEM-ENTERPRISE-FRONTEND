#!/bin/bash
set -e

# Ensure we are running from the project root (even if called from inside docker-setup)
cd "$(dirname "$0")/.."

# Terminal Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${CYAN}[INFO]${NC} Starting the Enterprise Release Packaging Process..."

RELEASE_DIR="NMS-Enterprise-Release"

# 1. Clean up old builds
rm -rf ${RELEASE_DIR}
rm -f ${RELEASE_DIR}.zip ${RELEASE_DIR}.tar.gz
mkdir -p ${RELEASE_DIR}

# 2. Build the Docker image
# We tell Docker to use the Dockerfile inside the docker-setup folder, but keep the context at root (.)
echo -e "${CYAN}[INFO]${NC} Step 1/4: Building Docker image from latest code..."
docker build -t nms-frontend:latest -f docker-setup/Dockerfile .

# 3. Export the image
echo -e "${CYAN}[INFO]${NC} Step 2/4: Exporting Docker image (this may take a minute)..."
docker save -o ${RELEASE_DIR}/nms-frontend-image.tar nms-frontend:latest

# 4. Copy necessary files (NO source code!)
echo -e "${CYAN}[INFO]${NC} Step 3/4: Copying deployment scripts..."
cp docker-setup/docker-compose.yml ${RELEASE_DIR}/
cp docker-setup/start.sh ${RELEASE_DIR}/
cp docker-setup/stop.sh ${RELEASE_DIR}/
cp docker-setup/.env.example ${RELEASE_DIR}/
cp README.md ${RELEASE_DIR}/ 2>/dev/null || true

# Ensure scripts are executable in the package
chmod +x ${RELEASE_DIR}/start.sh ${RELEASE_DIR}/stop.sh

# 5. Compress the folder
echo -e "${CYAN}[INFO]${NC} Step 4/4: Creating archive..."
if command -v zip &> /dev/null; then
  zip -r ${RELEASE_DIR}.zip ${RELEASE_DIR}
  rm -rf ${RELEASE_DIR}
  echo -e "${GREEN}[SUCCESS]${NC} Packaging complete! You can now share this file: ${GREEN}${RELEASE_DIR}.zip${NC}"
else
  tar -czvf ${RELEASE_DIR}.tar.gz ${RELEASE_DIR}
  rm -rf ${RELEASE_DIR}
  echo -e "${GREEN}[SUCCESS]${NC} Packaging complete! You can now share this file: ${GREEN}${RELEASE_DIR}.tar.gz${NC}"
fi

echo -e "${CYAN}[INFO]${NC} The end-user just needs to extract it and run ./start.sh"
