"use client"

import { motion } from "framer-motion"

interface Agent {
  id: string
  name: string
  status: "active" | "inactive"
  usage: number
  errorRate: number
  lastActive: string
}

interface AgentsListProps {
  agents: Agent[]
  selectedAgent: Agent | null
  onSelectAgent: (agent: Agent) => void
}

export default function AgentsList({ agents, selectedAgent, onSelectAgent }: AgentsListProps) {
  return (
    <div className="space-y-2">
      {agents.map((agent) => (
        <motion.button
          key={agent.id}
          onClick={() => onSelectAgent(agent)}
          className={`w-full text-left p-3 md:p-4 rounded-lg border transition-all duration-300 ${
            selectedAgent?.id === agent.id
              ? "bg-blue-50 border-blue-400 shadow-md"
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm md:text-base">{agent.name}</p>
              <p className="text-xs text-gray-500 mt-1">Active {agent.lastActive}</p>
            </div>
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${agent.status === "active" ? "bg-green-500" : "bg-red-500"}`}
            />
          </div>
        </motion.button>
      ))}
    </div>
  )
}
