# Servants of Bharat - Backend

This repository contains the backend source code for the **Servants of Bharat** volunteer platform.

## Tech Stack

- Python 3.11+
- Flask
- Flask-JWT-Extended
- SQLAlchemy
- PostgreSQL (Supabase) / SQLite
- bcrypt
- ReportLab
- Supabase Storage
- Flasgger (Swagger UI)

## Prerequisites

- Python 3.11 or later
- pip
- Virtual Environment (recommended)

## Installation

1. Clone the repository.


2. Navigate to the backend project directory.

```bash
cd MAY2026-Team-043/servants-of-india
```

> If you have already opened the `servants-of-india` folder, skip this step.

3. Create and activate a virtual environment.

```bash
python -m venv .venv
```

**Windows**

```bash
.venv\Scripts\activate
```

**macOS/Linux**

```bash
source .venv/bin/activate
```

4. Install dependencies.

```bash
pip install -r requirements.txt
```

5. Configure environment variables.

```bash
cp .env.example .env
```

Update the `.env` file with the required configuration values.

6. Seed the database.

```bash
python seed.py
```

## Run the Application

Start the Flask server:

```bash
python -m app.app
```

The API will be available at:

```
http://localhost:5000
```

## API Documentation

After starting the server:

- **Swagger UI**

```
http://localhost:5000/api/docs
```

- **OpenAPI Specification**

```
http://localhost:5000/api/openapi.json
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (optional for local development) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_KEY` | Supabase API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `JWT_SECRET_KEY` | Secret key for JWT authentication |
| `STORAGE_BACKEND` | `local` or `supabase` |
| `PORT` | Server port (default: 5000) |

## Project Structure

```
MAY2026-Team-043/
├── README.md
└── servants-of-india/
    ├── app/
    │   ├── app.py            # app factory + entrypoint + error handlers
    │   ├── config.py         # env-driven config
    │   ├── extensions.py     # db, jwt instances
    │   ├── models/           # 8 SQLAlchemy models + enums
    │   ├── services/         # storage, notifications, certificate PDF
    │   ├── utils/            # security, decorators (RBAC), validators, responses
    │   ├── docs/            # OpenAPI 3 spec + Swagger UI wiring
    │   ├── auth/  users/  categories/  events/  submissions/  reviews/
    │   ├── progress/  certificates/  notifications/  admin/   # one blueprint each
    ├── seed.py               # categories + first Super Admin
    ├── requirements.txt
    └── .env.example
```

## Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- Volunteer Management
- Event Management
- Proof Submission & Review
- Progress Tracking
- PDF Certificate Generation
- Certificate Verification
- Notifications
- Swagger API Documentation

## Project Status

This project is under active backend development. Features are implemented, tested, and reviewed before being promoted to the UAT and production branches.