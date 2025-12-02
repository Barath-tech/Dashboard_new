"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function QuickActions() {
  const actions = [
    {
      icon: "📋",
      title: "Logs",
      description: "View request logs",
      href: "/logs",
      accentColor: "green",
    },
    {
      icon: "🤖",
      title: "Agents",
      description: "Manage agents",
      href: "/agents",
      accentColor: "purple",
    },
    {
      icon: "💬",
      title: "Prompts",
      description: "Edit prompts",
      href: "/prompts",
      accentColor: "blue",
    },
    {
      icon: "⚙️",
      title: "Analytics",
      description: "View metrics",
      href: "/",
      accentColor: "cyan",
    },
  ]

  const accentMap: Record<string, string> = {
    green: "border-l-4 border-l-green-500",
    purple: "border-l-4 border-l-purple-500",
    blue: "border-l-4 border-l-blue-500",
    cyan: "border-l-4 border-l-cyan-500",
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={action.href}
              className={`flex flex-col bg-white border border-gray-200 rounded-lg p-5 transition-all duration-300 ease-out hover:border-gray-300 hover:shadow-md cursor-pointer group ${accentMap[action.accentColor]}`}
            >
              <div className="text-4xl mb-3">{action.icon}</div>
              <p className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                {action.title}
              </p>
              <p className="text-xs text-gray-500">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
