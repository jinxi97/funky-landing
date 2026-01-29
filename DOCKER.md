# Docker Setup for Funky Landing Page

## Quick Start

### Using Docker

Build and run the container:

```bash
# Build the Docker image
docker build -t funky-landing .

# Run the container
docker run -p 3000:3000 funky-landing
```

Visit http://localhost:3000

### Using Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d

# Stop
docker-compose down
```

## Production Deployment

The Dockerfile uses multi-stage builds for:
- Smaller image size
- Better security (non-root user)
- Optimized caching
- Production-ready standalone output

## Image Details

- Base: `node:22-alpine`
- Port: `3000`
- User: `nextjs` (non-root)
- Size: ~150-200MB (optimized)
