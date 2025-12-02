"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { fetchMetrics } from "@/lib/api"

interface MetricData {
  avgLatency: string
  costToday: string
  tokenUsage: string
  errors: number
  activeUsers: string
  retryRate: string
}

export default function MetricsCards() {
  const [metrics, setMetrics] = useState<MetricData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchMetrics()
        setMetrics(data)
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
    const interval = setInterval(loadMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading || !metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  const cards = [
    {
      icon: "⏱️",
      title: "Avg Latency",
      value: metrics.avgLatency,
      subtitle: "Stable",
      accentColor: "blue",
    },
    {
      icon: "💰",
      title: "Cost Today",
      value: metrics.costToday,
      subtitle: "estimated",
      accentColor: "green",
    },
    {
      icon: "🔤",
      title: "Token Usage",
      value: metrics.tokenUsage,
      subtitle: "50S prompt / 3.0k completion",
      accentColor: "purple",
    },
    {
      icon: "⚠️",
      title: "Errors",
      value: metrics.errors.toString(),
      subtitle: "in last 24h",
      accentColor: "red",
    },
    {
      icon: "🔄",
      title: "Retry Rate",
      value: metrics.retryRate,
      subtitle: "5xx or timeout issues",
      accentColor: "orange",
    },
    {
      icon: "👥",
      title: "Active Users",
      value: metrics.activeUsers,
      subtitle: "of traffic",
      accentColor: "cyan",
    },
  ]

  const accentBorderMap: Record<string, string> = {
    blue: "border-l-4 border-l-blue-500",
    green: "border-l-4 border-l-green-500",
    purple: "border-l-4 border-l-purple-500",
    red: "border-l-4 border-l-red-500",
    orange: "border-l-4 border-l-orange-500",
    cyan: "border-l-4 border-l-cyan-500",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 ease-out hover:border-gray-300 hover:shadow-md ${accentBorderMap[card.accentColor]}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl mb-2">{card.icon}</div>
              <p className="text-gray-600 text-sm">{card.title}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
