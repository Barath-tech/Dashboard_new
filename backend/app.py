from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from datetime import datetime

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

LOG_FILE = "chatbot_logs.json"


def load_logs():
    try:
        with open(LOG_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


@app.get("/logs/charts")
def get_chart_data():
    """Get chart data for all metrics"""
    logs = load_logs()

    if not logs:
        return {
            "latencyTrend": [],
            "tokenUsage": [],
            "costProgression": [],
            "errorRate": [],
            "userActivity": [],
        }

    # latency trend
    latencyTrend = [
        {"time": log["timestamp"], "latency": log["latency_ms"]} for log in logs
    ]

    # token usage
    tokenUsage = [
        {
            "time": log["timestamp"],
            "prompt": log["prompt_tokens"],
            "completion": log["completion_tokens"],
        }
        for log in logs
    ]

    # cost progression
    costProgression = [
        {"time": log["timestamp"], "cost": log["cost_usd"]} for log in logs
    ]

    # error rate
    errorRate = [
        {"time": log["timestamp"], "errors": 1 if log["is_error"] else 0}
        for log in logs
    ]

    # user activity
    userActivity = [
        {"time": log["timestamp"], "users": int(log["user_id"].split("_")[1])}
        for log in logs
    ]

    return {
        "latencyTrend": latencyTrend,
        "tokenUsage": tokenUsage,
        "costProgression": costProgression,
        "errorRate": errorRate,
        "userActivity": userActivity,
    }


@app.get("/logs/metrics")
def get_summary_metrics():
    """Get summary metrics for the dashboard"""
    logs = load_logs()

    if not logs:
        return {
            "avgLatency": "0.00 ms",
            "costToday": "$0.0000",
            "tokenUsage": "0 prompt / 0 completion",
            "errors": 0,
            "retryRate": "0",
            "activeUsers": "0",
        }

    avg_latency = sum([l["latency_ms"] for l in logs]) / len(logs)
    total_cost = sum([l["cost_usd"] for l in logs])
    total_prompt = sum([l["prompt_tokens"] for l in logs])
    total_completion = sum([l["completion_tokens"] for l in logs])
    errors = sum([1 for l in logs if l["is_error"]])
    retry_rate = sum([l["retry_count"] for l in logs])
    active_users = len(set([l["user_id"] for l in logs]))

    return {
        "avgLatency": f"{avg_latency:.2f} ms",
        "costToday": f"${total_cost:.4f}",
        "tokenUsage": f"{total_prompt} prompt / {total_completion} completion",
        "errors": errors,
        "retryRate": f"{retry_rate}",
        "activeUsers": f"{active_users}",
    }


@app.get("/logs/all")
def get_all_logs():
    """Get all chatbot logs"""
    return load_logs()
