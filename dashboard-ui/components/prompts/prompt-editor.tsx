"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Prompt {
  id: string
  name: string
  agent: string
  version: number
  text: string
  createdAt: string
  performance: number
}

interface PromptEditorProps {
  prompt: Prompt
  onSave: (prompt: Prompt) => void
}

export default function PromptEditor({ prompt, onSave }: PromptEditorProps) {
  const [text, setText] = useState(prompt.text)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedPrompt = {
      ...prompt,
      version: prompt.version + 1,
      text,
      performance: Math.min(100, prompt.performance + Math.random() * 10),
    }
    onSave(updatedPrompt)
    setIsSaving(false)
  }

  const performanceData = [
    { version: 1, performance: 65 },
    { version: 2, performance: 72 },
    { version: 3, performance: 78 },
    { version: 4, performance: 85 },
    { version: prompt.version, performance: prompt.performance },
  ]

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 md:space-y-6">
      <div className="metric-card">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{prompt.name}</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs md:text-sm">
          <span className="text-gray-600">Agent: {prompt.agent}</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded inline-block md:inline whitespace-nowrap">
            Version {prompt.version}
          </span>
        </div>
      </div>

      <div className="metric-card space-y-3 md:space-y-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Edit Prompt</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 md:h-64 bg-white border border-gray-300 rounded-lg p-3 md:p-4 text-gray-900 font-mono text-xs md:text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors duration-300"
          placeholder="Enter your prompt here..."
        />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-300 font-medium text-sm md:text-base"
        >
          {isSaving ? "Saving..." : "Save New Version"}
        </button>
      </div>

      <div className="metric-card">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Performance Analysis</h3>
        <ResponsiveContainer width="100%" height={200} minHeight={200}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="version"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
              label={{ value: "Version", position: "insideBottomRight", offset: -5 }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
              labelStyle={{ color: "#111827" }}
            />
            <Legend />
            <Line type="monotone" dataKey="performance" stroke="#10b981" strokeWidth={2} name="Performance %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="metric-card text-xs md:text-sm text-gray-600">
        <p>Created on {new Date(prompt.createdAt).toLocaleString()}</p>
        <p className="mt-2">
          Current Performance: <span className="text-green-600 font-semibold">{prompt.performance.toFixed(1)}%</span>
        </p>
      </div>
    </motion.div>
  )
}
