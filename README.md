# Well Production Monitoring Dashboard

A responsive oil & gas **Well Production Monitoring Dashboard** built with Next.js, Tailwind CSS, shadcn/ui, ECharts, Highcharts, and AG Grid.

The dashboard provides production analytics, well management, task management, user management, roles, permissions, authentication, and RBAC.

## Tech Stack

* Next.js
* JavaScript
* Tailwind CSS
* shadcn/ui
* ECharts
* Highcharts
* AG Grid
* Docker

## Getting Started

### 1. Clone the project

```bash
git clone https://github.com/Naitiknb/dashboard.git

cd dashboard
```

### 2. Start the application with Docker

The project uses a dedicated development Docker configuration.

```bash
docker compose -f docker-compose.dev.yaml up --build
```

The application will be available at:

```text
http://localhost:5000
```

The development container runs Next.js in development mode with source code mounted into the container. Changes to the source code are automatically reflected during development.

### 3. Stop the application

```bash
docker compose -f docker-compose.dev.yml down
```

## Default Login

```text
Email: su1@gmail.com
Password: 1234
```

The user is assigned the `Admin` role through `roleId`, and permissions are controlled through the RBAC system.

## Project Structure

```text
src/
├── app/              # Pages and API routes
├── themes/           # UI components
├── context/          # RBAC context
├── lib/              # Business logic and data access
└── data/             # Application data

data/                 # JSON data storage

Dockerfile            # Production Docker configuration
Dockerfile.dev        # Development Docker configuration
docker-compose.yml    # Production Docker Compose configuration
docker-compose.dev.yml # Development Docker Compose configuration
```

## Data Storage

For this take-home project, CRUD data is stored in JSON files under:

```text
data/
```

This keeps the project simple and avoids requiring a database setup.

The JSON files provide demo persistence for:

* Users
* Roles
* Permissions
* Wells
* Tasks
* Other application data

This approach is intended for demonstration purposes and is not intended to replace a production database.

## Docker Configuration

### Development

Local development uses `Dockerfile.dev`:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "5000"]
```

Development is started using:

```bash
docker compose -f docker-compose.dev.yml up --build
```

The development Compose configuration:

```yaml
services:
  dashboard:
    build:
      context: .
      dockerfile: Dockerfile.dev

    container_name: dashboard-dev

    ports:
      - "5000:5000"

    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
```

The source directory is mounted into the container to support live development and automatic updates.

### Production

A separate `Dockerfile` and `docker-compose.yml` are provided for production builds.

The production Dockerfile builds the Next.js application before starting the production server:

```text
npm run build
        ↓
Next.js production build
        ↓
npm start
```

Production does not mount the project directory as a volume, so the generated `.next` production build remains inside the Docker image.

## Notes

This project is intended as a frontend-focused demonstration and take-home assignment.

JSON file storage is used for demo persistence to avoid requiring a separate database setup.

The RBAC system demonstrates:

* User management
* Role management
* Permission management
* Role-based access control
* Protected routes
* User-specific permissions
* Task assignment

The Docker configuration separates local development from production builds so the application can be developed with live source updates while still supporting a compiled production image.
