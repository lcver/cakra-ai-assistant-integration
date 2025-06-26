# 🧠 Multi-Tenant AI Platform API

A full-featured multi-tenant API platform with:

-   🔐 JWT Authentication
-   🏢 Tenant-based data isolation
-   🤖 AI Integration (OpenAI ChatGPT)
-   🔗 Dynamic External Integrations (Mock & Real)
-   📄 API Documentation

---

## 🚀 Installation & Setup

### ⚙️ 1. Install Dependencies

```bash
npm install
```

### 🧪 2. Environment Variables

Create `.env` file based on `.env.example`:

```
DB_HOST=localhost
DB_NAME=multi_tenant_db
DB_USER=postgres
DB_PASS=your_password
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
```

### 🗃️ 3. Database Setup

#### Create Database

```bash
createdb multi_tenant_db
```

#### Run Migration

```bash
npm run migrate
```

---

### 🔐 4. Start Server

```bash
npm run dev
```

---

## 📬 Example API Requests

### 🔑 Register

```http
POST /api/auth/register
{
  "email": "admin@tenant.com",
  "password": "secret123",
  "tenant_id": "abc123"
}
```

### 🔑 Login

```http
POST /api/auth/login
→ returns { token, user }
```

### 🔐 Protected Route

```http
GET /api/conversations
Authorization: Bearer <your_token>
```

---

## 🧪 Test Tenants & Mock

| Tenant ID | Config Example                  |
| --------- | ------------------------------- |
| `abc123`  | GPT-4, formal, Bahasa Indonesia |
| `xyz789`  | GPT-3.5, casual, English        |

---

## 📄 Documentation

-   [API Docs (Markdown)](docs/API_DOCUMENTATION.md)
<!-- -   [Tenant Setup Guide](docs/TENANT_SETUP_GUIDE.md) -->

---

## 🧠 Powered by

-   Node.js + Express
-   Sequelize + PostgreSQL
-   OpenAI GPT-4/3.5
