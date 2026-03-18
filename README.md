# Usahawan Muda – Business Registration & Management System

Full-stack web app for collecting structured business data from young entrepreneurs, storing documents securely, and providing an admin and analytics dashboard.

- **Backend:** Django + Django REST Framework  
- **Database:** PostgreSQL (SQLite optional for local dev)  
- **Admin:** Django Admin  
- **Frontend:** React (separate project; communicates via REST APIs)  
- **Auth:** Django built-in (shared across Admin & Dashboard)  
- **Files:** Stored on backend (local for MVP); only paths/URLs in PostgreSQL  

---

## Project layout

```
UPUK/
├── backend/          # Django project
│   ├── config/       # settings, urls, wsgi
│   ├── businesses/   # app: Business model, admin, API, analytics
│   ├── media/        # uploaded files (created at runtime)
│   └── manage.py
├── frontend/         # React app (separate project)
├── requirements.txt
├── README.md
└── venv/             # Python virtual environment
```

---

## Backend setup

### 1. Virtual environment and dependencies

```bash
cd backend
python -m venv ..\venv
..\venv\Scripts\Activate.ps1   # Windows PowerShell
pip install -r ..\requirements.txt
```

### 2. Database

**Option A – PostgreSQL (recommended for production)**

- Create database: `createdb usahawan_muda` (or via pgAdmin).
- Optionally set env: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`.

**Option B – SQLite (local dev only)**

```powershell
$env:USE_SQLITE = "1"
```

### 3. Migrations and superuser

```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

### 4. Run server

```bash
python manage.py runserver
```

- Admin: http://localhost:8000/admin/  
- API base: http://localhost:8000/api/  

---

## API endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register/` | No | Submit business registration (multipart: files + JSON) |
| GET | `/api/choices/` | No | Dropdown choices (negeri, daerah, category, channel, revenue) |
| POST | `/api/auth/login/` | No | Login (username, password) → session |
| POST | `/api/auth/logout/` | Yes | Logout |
| GET | `/api/auth/me/` | Yes | Current user |
| GET | `/api/businesses/` | Yes | List registrations (filter by negeri, category, etc.) |
| GET | `/api/businesses/<id>/` | Yes | Registration detail |
| GET | `/api/analytics/overview/` | Yes | Total businesses |
| GET | `/api/analytics/by-negeri/` | Yes | Count by negeri (e.g. pie chart) |
| GET | `/api/analytics/by-category/` | Yes | Count by category |
| GET | `/api/analytics/revenue-distribution/` | Yes | Count by revenue range |

Registration payload: include all required fields; `ssm_certificate` and `company_logo` as file uploads; `business_channel` as array of `ecommerce` | `social_media` | `physical_store`. Use `multipart/form-data` or a mix of JSON + files as per your client.

---

## Django Admin

- View all registrations; search by company name, negeri, daerah; filter by business category and revenue range.
- View/download SSM certificate and company logo.
- Approve or reject via status field and bulk actions.

---

## Frontend (React)

See `frontend/` for the separate React project. It should:

- Call `/api/choices/` for dropdowns and `/api/register/` for submission (multipart).
- Use `/api/auth/login/`, `/api/auth/logout/`, `/api/auth/me/` with credentials (cookies) for the dashboard.
- Call analytics and list endpoints with the same session.

---

## Assumptions

- **Negeri / Daerah:** Fixed choice lists in code; extend `businesses.constants` as needed.
- **File storage:** Local `media/` for MVP; later swap to S3 or similar by changing `DEFAULT_FILE_STORAGE` and upload paths.
- **CORS:** Allowed origins default to `http://localhost:3000` and `http://127.0.0.1:3000`; set `CORS_ALLOWED_ORIGINS` in production.
- **Auth:** Session + cookie; React should use `credentials: 'include'` for API requests after login.
