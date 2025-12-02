"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import MetricsCards from "@/components/dashboard/metrics-cards"
import QuickActions from "@/components/dashboard/quick-actions"
import Charts from "@/components/dashboard/charts"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">🤖</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Monitor</h1>
          </div>
          <p className="text-gray-600">Real-time monitoring for your multi-agent system</p>
        </motion.div>

        {/* Metrics */}
        <MetricsCards />

        {/* Quick Actions */}
        <QuickActions />

        {/* Charts */}
        <Charts />
      </main>
    </div>
  )
}
