"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { fetchChartData } from "@/lib/api"

interface ChartData {
  latencyTrend: Array<{ time: string; latency: number }>
  tokenUsage: Array<{ time: string; prompt: number; completion: number }>
  costProgression: Array<{ time: string; cost: number }>
  errorRate: Array<{ time: string; errors: number }>
  userActivity: Array<{ time: string; users: number }>
}

export default function Charts() {
  const [data, setData] = useState<ChartData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const chartData = await fetchChartData()
        setData(chartData)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
    const interval = setInterval(loadData, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="metric-card h-80 bg-gray-100 animate-pulse" />
        ))}
      </div>
    )
  }

  const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="metric-card">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      {children}
    </motion.div>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency Trend */}
        <ChartCard title="Latency Trends">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.latencyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                labelStyle={{ color: "#111827" }}
              />
              <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Token Usage */}
        <ChartCard title="Token Usage Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.tokenUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                labelStyle={{ color: "#111827" }}
              />
              <Legend />
              <Area type="monotone" dataKey="prompt" stackId="1" fill="#a78bfa" stroke="#a78bfa" />
              <Area type="monotone" dataKey="completion" stackId="1" fill="#22d3ee" stroke="#22d3ee" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Cost Progression */}
        <ChartCard title="Cost Progression">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.costProgression}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                labelStyle={{ color: "#111827" }}
              />
              <Bar dataKey="cost" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Error Rate */}
        <ChartCard title="Error Rate Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.errorRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                labelStyle={{ color: "#111827" }}
              />
              <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* User Activity */}
      <div className="lg:col-span-2">
        <ChartCard title="User Activity">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.userActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: "12px" }} />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                labelStyle={{ color: "#111827" }}
              />
              <Line type="monotone" dataKey="users" stroke="#22d3ee" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
