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

### 2. Start with Docker

```bash
docker compose up --build
```

The application will be available at:

```text
http://localhost:5000
```

### 3. Development

The project runs Next.js in development mode inside Docker.

Source code is mounted into the container, so changes are reflected automatically.

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
└── data/              # JSON data storage

Dockerfile
docker-compose.yml
```

## Data Storage

For this take-home project, CRUD data is stored in JSON files under:

```text
data/
```

This keeps the project simple and avoids requiring a database setup.

## Docker Configuration

The application runs on port `5000`.

```yaml
services:
  dashboard:
    build: .
    container_name: dashboard
    ports:
      - "5000:5000"
    volumes:
      - .:/app
      - /app/node_modules
```

## Notes

This project is intended as a frontend-focused demonstration. JSON file storage is used for demo persistence and is not intended as production database storage.
