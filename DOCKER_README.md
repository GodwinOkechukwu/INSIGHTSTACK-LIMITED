# Docker Setup Guide

This guide explains how to build and run the warespire Digital Innovations application using Docker.

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- `docker` and `docker-compose` commands available in your terminal
- An AWS S3 bucket (for file uploads)
- PostgreSQL credentials (or use the provided Docker PostgreSQL)

## Quick Start

### 1. Prepare Environment Variables

Copy the environment template and fill in your values:

```bash
cp .env.docker.example .env.local
```

Edit `.env.local` and replace the placeholder values:

```env
# AWS S3 Configuration
S3_ACCESS_KEY=your_aws_access_key_id
S3_SECRET_KEY=your_aws_secret_access_key
S3_BUCKET_NAME=your_s3_bucket_name

# JWT Secret (generate a strong random string)
JWT_SECRET=your_long_random_jwt_secret_string_min_32_chars

# Other required variables (see .env.docker.example for all options)
```

### 2. Build the Docker Image

```bash
docker build -t warespire:latest .
```

Or with a specific version tag:

```bash
docker build -t warespire:1.0.0 .
```

### 3. Run with Docker Compose (Recommended)

This starts both PostgreSQL and the Next.js application:

```bash
docker-compose up -d
```

The application will be available at: **http://localhost:4019**

To view logs:

```bash
docker-compose logs -f app
```

To stop:

```bash
docker-compose down
```

### 4. Run Standalone Container

If you already have PostgreSQL running externally, you can run just the app:

```bash
docker run -d \
  --name warespire_app \
  -p 4019:4019 \
  --env-file .env.local \
  warespire:latest
```

Replace `warespire:latest` with your image name/tag.

## Environment Variables

All required environment variables are listed in [.env.docker.example](.env.docker.example).

### Key Variables

| Variable               | Purpose                              | Required | Default                 |
| ---------------------- | ------------------------------------ | -------- | ----------------------- |
| `NEXT_PUBLIC_BASE_URL` | Application base URL                 | Yes      | `http://localhost:4019` |
| `DB_HOST`              | PostgreSQL hostname                  | Yes      | `postgres` (compose)    |
| `DB_PORT`              | PostgreSQL port                      | No       | `5432`                  |
| `DB_NAME`              | Database name                        | No       | `store_db`              |
| `DB_USER`              | PostgreSQL user                      | No       | `postgres`              |
| `DB_PASSWORD`          | PostgreSQL password                  | No       | `Retail@1234`           |
| `S3_ACCESS_KEY`        | AWS access key                       | Yes      | -                       |
| `S3_SECRET_KEY`        | AWS secret key                       | Yes      | -                       |
| `S3_BUCKET_NAME`       | S3 bucket name                       | Yes      | -                       |
| `JWT_SECRET`           | JWT signing secret                   | Yes      | -                       |
| `TABLE_PREFIX`         | Database table prefix                | No       | `warespire_`            |
| `NODE_ENV`             | Environment (development/production) | No       | `production`            |
| `PORT`                 | Application port (in container)      | No       | `4019`                  |

## Database Initialization

When using Docker Compose, PostgreSQL starts empty. To initialize the database:

### Option 1: Using Compose Init Scripts

Uncomment these lines in `docker-compose.yml`:

```yaml
volumes:
  - ./src/lib/schema.sql:/docker-entrypoint-initdb.d/01-schema.sql
  - ./src/lib/seed.sql:/docker-entrypoint-initdb.d/02-seed.sql
```

Then recreate containers:

```bash
docker-compose down -v  # Remove volume
docker-compose up -d
```

### Option 2: Manual Initialization

```bash
# Connect to the PostgreSQL container
docker exec -it warespire_postgres psql -U postgres -d store_db

# Run schema SQL
\i /docker-entrypoint-initdb.d/01-schema.sql
\i /docker-entrypoint-initdb.d/02-seed.sql
```

### Option 3: Bootstrap Admin User

After the app is running, create the super admin:

```bash
curl "http://localhost:4019/api/admin/bootstrap?secret=clowstack-admin-2024"
```

Default admin credentials:

- Email: `admin@gmail.com`
- Password: `admin`

**⚠️ Change these immediately after first login!**

## Port Configuration

The application **listens on port 4019** inside the container:

- **Container Port**: 4019 (fixed in Dockerfile)
- **Host Port**: 4019 (mapped in docker-compose.yml or `-p` flag)
- **HOSTNAME**: 0.0.0.0 (listens on all network interfaces)

To use a different host port, either:

1. In `docker-compose.yml`:

   ```yaml
   ports:
     - "8000:4019" # Host:Container
   ```

2. Or with `docker run`:
   ```bash
   docker run -p 8000:4019 warespire:latest
   ```

## Production Deployment

For production deployment:

1. **Use environment secrets management** (not plain .env files)
   - AWS Secrets Manager
   - Azure Key Vault
   - Kubernetes Secrets
   - HashiCorp Vault

2. **Scale the application**:

   ```bash
   docker-compose up -d --scale app=3
   ```

3. **Use a reverse proxy** (Nginx, Traefik, etc.) for load balancing

4. **Set up health checks**:

   ```bash
   curl http://localhost:4019  # Should return 200
   ```

5. **Enable logging and monitoring**:

   ```bash
   docker-compose logs --follow app
   ```

6. **Update docker-compose.yml**:
   ```yaml
   environment:
     NODE_ENV: production
     PORT: 4019
   restart: always
   ```

## Troubleshooting

### Container won't start

Check logs:

```bash
docker-compose logs app
```

Common issues:

- **Database connection error**: Ensure `DB_HOST` matches the service name (`postgres`)
- **Missing S3 credentials**: Verify `S3_ACCESS_KEY` and `S3_SECRET_KEY`
- **Port already in use**: Change host port in docker-compose.yml

### Database migration issues

Verify database schema exists:

```bash
docker exec warespire_postgres psql -U postgres -d store_db -c "\dt"
```

### S3 upload failures

Test S3 credentials:

```bash
aws s3 ls s3://your_bucket_name --profile default
```

Check bucket policy allows uploads.

### App crashes on startup

Increase memory allocation to Docker Desktop:

- Settings → Resources → Memory: 4GB+
- Settings → Resources → CPU: 4+

## Cleanup

Remove all containers and volumes:

```bash
docker-compose down -v
```

Remove image:

```bash
docker rmi warespire:latest
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment/docker)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)

## Support

For issues with the Docker setup, check:

1. Environment variables are correctly set
2. Docker Desktop is running
3. No port conflicts on your system
4. Database is accessible and initialized
