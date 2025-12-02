"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import AgentsList from "@/components/agents/agents-list"
import AgentDetail from "@/components/agents/agent-detail"
import { motion } from "framer-motion"
import { fetchAgents } from "@/lib/api"

interface Agent {
  id: string
  name: string
  status: "active" | "inactive"
  usage: number
  errorRate: number
  lastActive: string
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await fetchAgents()
        setAgents(data)
      } catch (error) {
        console.error("Failed to fetch agents:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAgents()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-6 md:py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Agents Management</h1>
            <p className="text-sm md:text-base text-gray-600">Monitor and manage all agents in your system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="md:col-span-1">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <AgentsList agents={agents} selectedAgent={selectedAgent} onSelectAgent={setSelectedAgent} />
              )}
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              {selectedAgent ? (
                <AgentDetail agent={selectedAgent} />
              ) : (
                <div className="metric-card h-40 md:h-96 flex items-center justify-center text-gray-600">
                  Select an agent to view details
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
