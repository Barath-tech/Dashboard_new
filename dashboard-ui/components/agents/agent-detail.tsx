"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { fetchAgentDetails } from "@/lib/api"

interface Agent {
  id: string
  name: string
  status: "active" | "inactive"
  usage: number
  errorRate: number
  lastActive: string
}

interface AgentDetailsData {
  usageGraph: Array<{ time: string; usage: number }>
  errorGraph: Array<{ time: string; errors: number }>
  tokenGraph: Array<{ time: string; tokens: number }>
}

interface AgentDetailProps {
  agent: Agent
}

export default function AgentDetail({ agent }: AgentDetailProps) {
  const [data, setData] = useState<AgentDetailsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const details = await fetchAgentDetails(agent.id)
        setData(details)
      } catch (error) {
        console.error("Failed to fetch agent details:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDetails()
  }, [agent.id])

  if (loading || !data) {
    return <div className="metric-card h-40 md:h-96 bg-gray-200 animate-pulse rounded-lg" />
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 md:space-y-6">
      <div className="metric-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{agent.name}</h2>
          <div
            className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${
              agent.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div>
            <p className="text-gray-600 text-xs md:text-sm">Usage</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1">{agent.usage.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs md:text-sm">Error Rate</p>
            <p className="text-lg md:text-2xl font-bold text-red-600 mt-1">{agent.errorRate.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-gray-600 text-xs md:text-sm">Last Active</p>
            <p className="text-xs md:text-base font-semibold text-gray-900 mt-1">{agent.lastActive}</p>
          </div>
        </div>
      </div>

      <div className="metric-card">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Agent Usage</h3>
        <ResponsiveContainer width="100%" height={200} minHeight={200}>
          <LineChart data={data.usageGraph}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              labelStyle={{ color: "#111827" }}
            />
            <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="metric-card">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Error Rate</h3>
        <ResponsiveContainer width="100%" height={200} minHeight={200}>
          <BarChart data={data.errorGraph}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              labelStyle={{ color: "#111827" }}
            />
            <Bar dataKey="errors" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="metric-card">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Token Usage</h3>
        <ResponsiveContainer width="100%" height={200} minHeight={200}>
          <LineChart data={data.tokenGraph}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              labelStyle={{ color: "#111827" }}
            />
            <Line type="monotone" dataKey="tokens" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
