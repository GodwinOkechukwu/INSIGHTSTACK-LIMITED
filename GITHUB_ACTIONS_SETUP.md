# GitHub Actions Deployment Setup Guide

This guide explains how to set up the GitHub Actions workflows for automated deployment of the insightstack limited  application.

## Overview

Two workflows are configured:

1. **`deploy_staging.yml`** - Deploys to staging when code is pushed to the `dev` branch
2. **`deploy_production.yml`** - Deploys to production when code is pushed to the `main` branch

Both workflows:

- Build a Docker image
- Push it to Docker Hub
- Pull the image on your server
- Run the container on port 4019
- Verify the deployment with health checks

## Prerequisites

1. **Docker Hub Account** - To store Docker images
2. **GitHub Repository** - With access to Settings
3. **Self-Hosted Runner** - A server with Docker installed to run the deployments
4. **Environment Files** - `.env.staging` and `.env.production` on your server

## Step 1: Set Up Docker Hub

### Create Docker Hub Account

- Go to [hub.docker.com](https://hub.docker.com)
- Sign up or log in with existing account

### Generate Personal Access Token (PAT)

Your Docker credentials:

- **Username**: `slemfowel1`
- **Token**: Provided separately (see your Docker Hub account)

To generate a new token in Docker Hub:

1. Log in to Docker Hub
2. Go to **Account Settings** → **Security**
3. Click **New Access Token**
4. Name it (e.g., `GitHub-Actions`)
5. Set permissions: **Read & Write**
6. Copy the token

## Step 2: Configure GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these two secrets:

| Secret Name           | Value                            |
| --------------------- | -------------------------------- |
| `NDOCKERHUB_USERNAME` | `slemfowel1`                     |
| `NDOCKERHUB_TOKEN`    | Your Docker Hub PAT (see Step 1) |

⚠️ **Never commit these secrets to the repository!**

## Step 3: Set Up Self-Hosted Runner

Your server needs to run GitHub's self-hosted runner to execute deployments.

### Install Docker on Server

```bash
# macOS
brew install docker docker-compose

# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# RHEL/CentOS
sudo yum install -y docker docker-compose
```

### Start Docker Service

```bash
sudo systemctl start docker
sudo usermod -aG docker $USER
# Log out and back in for group change to take effect
```

### Download and Configure Runner

On your server:

```bash
# Create runner directory
mkdir -p /opt/github-runner
cd /opt/github-runner

# Download the latest runner
curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64.tar.gz

# Extract
tar xzf ./actions-runner-linux-x64.tar.gz

# Configure
./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN

# Install and run
sudo ./svc.sh install
sudo ./svc.sh start
```

### For macOS:

```bash
mkdir -p /opt/github-runner
cd /opt/github-runner

curl -o actions-runner-osx-arm64.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-osx-arm64.tar.gz
tar xzf ./actions-runner-osx-arm64.tar.gz

./config.sh --url https://github.com/YOUR_USERNAME/YOUR_REPO --token YOUR_TOKEN
./run.sh
```

To get your token:

1. Go to GitHub repository → **Settings** → **Actions** → **Runners**
2. Click **New self-hosted runner**
3. Copy the configuration token

## Step 4: Prepare Environment Files on Server

Create the environment files that the Docker containers will use:

### On your server (e.g., `/home/apps/`)

```bash
# Create apps directory
mkdir -p /home/apps
chmod 700 /home/apps

# Create staging environment file
cat > /home/apps/.env.staging << 'EOF'
NEXT_PUBLIC_BASE_URL=http://your-staging-domain.com:4019
NODE_ENV=production
PORT=4019

# Database
DB_HOST=your_postgres_host
DB_PORT=5432
DB_NAME=store_db_staging
DB_USER=postgres
DB_PASSWORD=your_staging_password
DB_SSL=false

# AWS S3
S3_ACCESS_KEY=your_aws_access_key
S3_SECRET_KEY=your_aws_secret_key
S3_REGION=us-east-1
S3_BUCKET_NAME=your-staging-bucket

# JWT
JWT_SECRET=your_staging_jwt_secret_min_32_chars

# Other
TABLE_PREFIX=insightstack_
NEXT_PUBLIC_CHECKOUT_API=https://checkout-api-service-dev.eks-alliancepay.com
NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY_API=your_key
NEXT_PUBLIC_ENCRYPTION_KEY=your_key
NEXT_PUBLIC_ENCRYPTION_BASE_URL=http://your-encryption-service/api
EOF

# Create production environment file
cat > /home/apps/.env.production << 'EOF'
NEXT_PUBLIC_BASE_URL=http://your-production-domain.com:4019
NODE_ENV=production
PORT=4019

# Database
DB_HOST=your_postgres_host
DB_PORT=5432
DB_NAME=store_db_production
DB_USER=postgres
DB_PASSWORD=your_production_password
DB_SSL=true

# AWS S3
S3_ACCESS_KEY=your_aws_access_key
S3_SECRET_KEY=your_aws_secret_key
S3_REGION=us-east-1
S3_BUCKET_NAME=your-production-bucket

# JWT
JWT_SECRET=your_production_jwt_secret_min_32_chars

# Other
TABLE_PREFIX=insightstack_
NEXT_PUBLIC_CHECKOUT_API=https://checkout-api-service.eks-alliancepay.com
NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY_API=your_key
NEXT_PUBLIC_ENCRYPTION_KEY=your_key
NEXT_PUBLIC_ENCRYPTION_BASE_URL=http://your-encryption-service/api
EOF

# Secure the files
chmod 600 /home/apps/.env.*
```

⚠️ **Important**: Replace all placeholder values with your actual credentials.

## Step 5: Test the Workflow

### Manual Trigger

1. Go to GitHub repository → **Actions**
2. Select the workflow you want to run
3. Click **Run workflow** → Select branch → **Run workflow**

### Automatic Trigger

- **Staging**: Push code to the `dev` branch
- **Production**: Push code to the `main` branch

## Step 6: Monitor Deployment

In GitHub:

1. Go to **Actions** tab
2. Click on the running workflow
3. Watch the job logs in real-time

View container logs on server:

```bash
# Staging
docker logs -f insightstack-staging

# Production
docker logs -f insightstack-production
```

## Workflow Details

### Staging Workflow (`deploy_staging.yml`)

- Triggers on: Push to `dev` branch
- Docker image tag: `slemfowel1/insightstack-digital-innovations:staging`
- Container name: `insightstack-staging`
- Port: `4019`
- Env file: `/home/apps/.env.staging`
- Health check: 30 attempts (1 minute timeout)

### Production Workflow (`deploy_production.yml`)

- Triggers on: Push to `main` branch
- Docker image tags: `latest` and version tag (git tag)
- Container name: `insightstack-production`
- Port: `4019`
- Env file: `/home/apps/.env.production`
- Auto-restart: `unless-stopped`
- Health check: 40 attempts (1.5 minute timeout)
- Cleanup: Removes images older than 72 hours

## Troubleshooting

### Workflow not running

**Check**: Is the self-hosted runner online?

```bash
# On server, check runner status
ps aux | grep -i runner
```

**Solution**: Restart the runner service

```bash
sudo ./svc.sh stop
sudo ./svc.sh start
```

### Docker login fails

**Check**: Are `NDOCKERHUB_USERNAME` and `NDOCKERHUB_TOKEN` secrets set correctly?

**Solution**: Verify in GitHub Settings → Secrets and update if needed

### Container exits immediately

**Check**: View logs

```bash
docker logs insightstack-staging
```

**Common issues**:

- Missing environment variables (check `.env.staging`)
- Database connection failed
- Port 4019 already in use
- Invalid JWT_SECRET

### Port conflicts

If port 4019 is already in use:

1. Stop conflicting container: `docker stop <container_id>`
2. Or change port mapping in workflow

### Health check timeout

If deployment seems slow:

1. Check server CPU/RAM
2. Increase health check retries in workflow
3. Verify database connectivity

## Security Best Practices

1. ✅ **Use strong secrets** - Generate long random strings for JWT_SECRET
2. ✅ **Rotate tokens regularly** - Update Docker Hub PAT annually
3. ✅ **Limit runner permissions** - Self-hosted runners should not run untrusted code
4. ✅ **Use branch protection** - Require reviews before merging to `main`
5. ✅ **Monitor deployments** - Review workflow logs regularly
6. ✅ **Secure environment files** - Restrict access to `/home/apps/`
7. ✅ **Use database SSL** - Set `DB_SSL=true` for production

## Database Migrations

If you need to run database migrations:

```bash
# Add to your pre-deployment script
docker exec insightstack-production npm run migrate
```

Or add to workflow before health check:

```yaml
- name: Run Database Migrations
  run: docker exec insightstack-production npm run db:migrate
```

## Rollback

To rollback to a previous version:

```bash
# On server
docker stop insightstack-production
docker rm insightstack-production
docker pull slemfowel1/insightstack-digital-innovations:previous_tag
docker run -d -p 4019:4019 --name insightstack-production \
  --env-file /home/apps/.env.production \
  slemfowel1/insightstack-digital-innovations:previous_tag
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Self-Hosted Runners](https://docs.github.com/en/actions/hosting-your-own-runners)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [Docker login Action](https://github.com/docker/login-action)
- [Build & Push Action](https://github.com/docker/build-push-action)

## Support

For issues:

1. Check workflow logs in GitHub Actions
2. SSH to server and check container logs: `docker logs <container_name>`
3. Verify environment variables: `docker exec <container_name> env | grep DB_`
4. Ensure database is accessible: `docker exec <container_name> nc -zv <db_host> <db_port>`
