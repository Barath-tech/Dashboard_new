"use client"

import { motion } from "framer-motion"

interface Prompt {
  id: string
  name: string
  agent: string
  version: number
  text: string
  createdAt: string
  performance: number
}

interface PromptsListProps {
  prompts: Prompt[]
  selectedPrompt: Prompt | null
  onSelectPrompt: (prompt: Prompt) => void
}

export default function PromptsList({ prompts, selectedPrompt, onSelectPrompt }: PromptsListProps) {
  return (
    <div className="space-y-2">
      {prompts.map((prompt) => (
        <motion.button
          key={prompt.id}
          onClick={() => onSelectPrompt(prompt)}
          className={`w-full text-left p-3 md:p-4 rounded-lg border transition-all duration-300 ${
            selectedPrompt?.id === prompt.id
              ? "bg-purple-50 border-purple-400 shadow-md"
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="font-semibold text-gray-900 text-sm md:text-base truncate">{prompt.name}</p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded whitespace-nowrap">
              v{prompt.version}
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-2 truncate">{prompt.agent}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-green-600 font-medium">📊 {prompt.performance}%</span>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
