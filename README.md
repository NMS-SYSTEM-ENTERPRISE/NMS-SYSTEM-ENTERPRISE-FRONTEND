# NMS Enterprise Frontend - Docker Deployment Guide

## Overview
This repository contains the enterprise-grade Dockerized setup for the NMS Frontend application. It is optimized for Linux deployments and designed with strict security, minimal image size, and performance best practices. End users are **not required** to install Node.js, manage npm dependencies, or possess prior Docker experience.

## Requirements
To run this application, the host machine must have the following installed:
- **Docker Engine** (or Docker Desktop)
- **Docker Compose** plugin (usually bundled with modern Docker installations)

No Node.js, npm, or local development tools are required.

## Folder Structure
```text
project/
├── Dockerfile          # Multi-stage production build configuration
├── docker-compose.yml  # Container orchestration and runtime settings
├── .dockerignore       # Optimizes build context and ensures security
├── .env.example        # Template for production environment variables
├── start.sh            # Automated startup script (Linux/Mac)
├── stop.sh             # Automated teardown script (Linux/Mac)
├── package.json        # Node.js dependencies configuration
├── next.config.mjs     # Next.js standalone output configuration
└── src/                # Application source code
```

## Installation
1. Obtain the project source code (via Git, USB, Network Share, etc.).
2. Navigate to the project directory in your terminal:
   ```bash
   cd /path/to/project
   ```
3. Grant execution permissions to the scripts (if not already set):
   ```bash
   chmod +x start.sh stop.sh
   ```

## Start
To automatically build the image, install dependencies inside the container, and start the application in the background, run:
```bash
./start.sh
```
*Alternatively, you can manually run `docker compose up -d`.*

Upon success, the application will be accessible at **http://localhost:3000** (or your configured port).

## Stop
To stop the application and clean up running containers gracefully, run:
```bash
./stop.sh
```
*Alternatively, you can manually run `docker compose down`.*

## Restart
If you need to restart the application to apply configuration changes, simply run the stop command followed by the start command:
```bash
./stop.sh && ./start.sh
```

## Logs
To monitor the live output from the container, run:
```bash
docker compose logs -f
```
Press `Ctrl+C` to exit the log view.

## Update
When receiving new source code, overwrite your local files and execute the start script. The script automatically rebuilds the Docker image with your latest changes:
```bash
./start.sh
```

## Environment Variables
The application ships with an `.env.example` file. The `start.sh` script automatically copies this to `.env` if one does not exist.
To customize settings (such as `PORT`), edit the `.env` file before starting the application:
```env
PORT=3000
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Container Health Status
The Docker setup includes a built-in healthcheck. Docker will automatically poll the application to ensure it is responding. You can check the health status via:
```bash
docker ps
```
Look for `(healthy)` or `(starting)` in the STATUS column.

## Common Errors
- **Address already in use (Port 3000)**: Another application is using port 3000. Edit your `.env` file and change `PORT=8080`, then restart the application.
- **Permission Denied executing start.sh**: Run `chmod +x start.sh` to make the script executable.
- **Docker daemon is not running**: Ensure Docker is started on your system before executing the scripts.

## FAQ
**Q: Do I need to run `npm install`?**
A: No, the `Dockerfile` automatically installs dependencies and builds the application inside the isolated container environment.

**Q: Where are my node_modules?**
A: They exist exclusively inside the Docker image. This keeps your local filesystem clean and guarantees identical environments across all machines.

**Q: Can I use Docker commands directly?**
A: Yes, you can freely substitute the `start.sh` and `stop.sh` scripts with standard `docker compose up -d` and `docker compose down` commands.

## Docker Commands
For advanced users, here are equivalent standard Docker commands:
- Start and build: `docker compose up -d --build`
- Stop and remove: `docker compose down`
- View logs: `docker compose logs -f`
- Check status: `docker ps`
- Enter container shell: `docker exec -it nms_frontend_app /bin/sh`

## Build and Share
./docker-setup/export-release.sh

## OTHER Machine Starts & Stop the App
./start.sh
./stop.sh
