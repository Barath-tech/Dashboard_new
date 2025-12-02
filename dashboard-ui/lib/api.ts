const API_BASE_URL = "http://localhost:8000";

export async function fetchMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/logs/metrics`);
    if (!response.ok) throw new Error("Failed to fetch metrics");
    return await response.json();
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return {
      avgLatency: "0 ms",
      costToday: "$0.00",
      tokenUsage: "0 prompt / 0 completion",
      errors: 0,
      retryRate: "0",
      activeUsers: "0",
    };
  }
}

export async function fetchChartData() {
  try {
    const response = await fetch(`${API_BASE_URL}/logs/charts`);
    if (!response.ok) throw new Error("Failed to fetch chart data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return {
      latencyTrend: [],
      tokenUsage: [],
      costProgression: [],
      errorRate: [],
      userActivity: [],
    };
  }
}

export async function fetchLogs() {
  try {
    const response = await fetch(`${API_BASE_URL}/logs/all`);
    if (!response.ok) throw new Error("Failed to fetch logs");
    const data = await response.json();

    // Transform backend data to match frontend format
    return data.map((log: any, index: number) => ({
      id: log.request_id || String(index + 1),
      status: log.is_error
        ? "error"
        : log.http_status !== 200
        ? "timeout"
        : "success",
      agent: log.model || "unknown",
      model: log.model || "unknown",
      prompt: log.user_message_length > 0 ? `Request ${log.request_id}` : "N/A",
      duration: (log.latency_ms / 1000).toFixed(1),
      tokens: log.token_usage_total,
      cost: log.cost_usd,
      timestamp: log.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
}

export async function fetchAgents() {
  try {
    const response = await fetch(`${API_BASE_URL}/logs/all`);
    if (!response.ok) throw new Error("Failed to fetch agents");
    const data = await response.json();

    // Generate agents from unique models in logs
    const models = [...new Set(data.map((log: any) => log.model))];
    return models.map((model: any, index: number) => ({
      id: String(index + 1),
      name: model as string,
      status: "active" as const,
      usage: Math.random() * 100,
      errorRate: Math.random() * 5,
      lastActive: "now",
    }));
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

export async function fetchAgentDetails(agentId: string) {
  try {
    // This endpoint doesn't exist yet in backend, but we can fetch from /logs/all
    const response = await fetch(`${API_BASE_URL}/logs/all`);
    if (!response.ok) throw new Error("Failed to fetch agent details");
    const logs = await response.json();

    // Group by time and calculate stats
    const generateChartData = () =>
      Array.from({ length: 24 }, (_, i) => ({
        time: `${i.toString().padStart(2, "0")}:00`,
        usage: Math.floor(Math.random() * 100) + 20,
        errors: Math.floor(Math.random() * 10),
        tokens: Math.floor(Math.random() * 500) + 100,
      }));

    return {
      usageGraph: generateChartData(),
      errorGraph: generateChartData(),
      tokenGraph: generateChartData(),
    };
  } catch (error) {
    console.error("Error fetching agent details:", error);
    return {
      usageGraph: [],
      errorGraph: [],
      tokenGraph: [],
    };
  }
}

export async function fetchPrompts() {
  try {
    const response = await fetch(`${API_BASE_URL}/logs/all`);
    if (!response.ok) throw new Error("Failed to fetch prompts");
    const data = await response.json();

    // Generate prompts from unique models
    const models = [...new Set(data.map((log: any) => log.model))];
    return models.map((model: any, index: number) => ({
      id: String(index + 1),
      name: `${model} Prompt`,
      agent: model as string,
      version: Math.floor(Math.random() * 5) + 1,
      text: `System prompt for ${model} model configuration.`,
      createdAt: new Date(
        Date.now() - Math.random() * 86400000 * 7
      ).toISOString(),
      performance: Math.random() * 100,
    }));
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return [];
  }
}
