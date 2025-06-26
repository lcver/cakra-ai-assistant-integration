# 📄 API Documentation

This document covers all available API endpoints for the Multi-Tenant AI Platform.

---

## 🔐 Authentication

### POST `/api/auth/signup`

Register a new user.

**Body:**

```json
{
    "name": "Jajang Sutejo",
    "email": "admin@tenant.com",
    "username": "jajang",
    "password": "secret123",
    "is_active": 1
}
```

---

### POST `/api/auth/signin`

Login and receive JWT token.

**Body:**

```json
{
    "username": "jajang",
    "password": "secret123"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN",
  "user": { ... }
}
```

---

## 🔒 Protected Routes (JWT Required)

### GET `/api/:{tenant_id}/conversations`

Get all conversations for the authenticated tenant.

### POST `/api/:{tenant_id}/conversations`

Create a new conversation.

```json
{
    "user_id": "user001",
    "message": "you are an artistic"
}
```

### POST `/api/:{tenant_id}/conversations/:{conversation_id}/messages`

Create a new conversation.

```json
{
    "user_id": "user001",
    "message": "you are an artistic"
}
```

---
