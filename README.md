# Dashboard Setup Guide

This guide will help you run the full-stack dashboard with backend and frontend.

## Prerequisites

- Python 3.8+
- Node.js 16+
- pnpm (or npm)

## Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install FastAPI dependencies:**

   ```bash
   pip install fastapi uvicorn python-multipart
   ```

3. **Run the backend server:**

   ```bash
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend will be available at `http://localhost:8000`

4. **Available endpoints:**
   - `GET /health` - Health check
   - `GET /logs/metrics` - Summary metrics (avg latency, cost, tokens, errors, etc.)
   - `GET /logs/charts` - Chart data (latency trend, token usage, cost progression, error rate, user activity)
   - `GET /logs/all` - All logs from chatbot_logs.json

## Frontend Setup

1. **Navigate to dashboard-ui directory:**

   ```bash
   cd dashboard-ui
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

   The frontend will be available at `http://localhost:3000`

## How It Works

1. **Backend** (`backend/app.py`):

   - Reads from `chatbot_logs.json`
   - Provides REST API endpoints
   - CORS enabled for frontend communication

2. **Frontend** (`dashboard-ui/lib/api.ts`):

   - Fetches data from backend API
   - Displays metrics, charts, logs, agents, and prompts
   - Real-time data updates

3. **Data Flow**:
   ```
   chatbot_logs.json → FastAPI → REST API → React Dashboard
   ```

## Data Structure

The backend expects `chatbot_logs.json` with the following format:

```json
[
  {
    "timestamp": "2025-01-14T10:00:03Z",
    "request_id": "REQ-001",
    "user_id": "user_12",
    "model": "gpt-4o-mini",
    "latency_ms": 1160,
    "prompt_tokens": 108,
    "completion_tokens": 204,
    "cost_usd": 0.0014,
    "http_status": 200,
    "is_error": false,
    "error_type": null,
    "retry_count": 0,
    "token_usage_total": 312,
    ...
  }
]
```

## Troubleshooting

- **CORS errors**: Make sure backend is running on `http://localhost:8000`
- **Connection refused**: Verify both services are running
- **Empty dashboard**: Check if `chatbot_logs.json` contains data
- **Port already in use**: Change port numbers in app.py and API_BASE_URL in api.ts

## Running Both Services

### Terminal 1 (Backend):

```bash
cd backend
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 (Frontend):

```bash
cd dashboard-ui
pnpm dev
```

Then open `http://localhost:3000` in your browser.
