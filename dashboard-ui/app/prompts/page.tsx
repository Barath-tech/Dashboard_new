"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import PromptsList from "@/components/prompts/prompts-list"
import PromptEditor from "@/components/prompts/prompt-editor"
import { motion } from "framer-motion"
import { fetchPrompts } from "@/lib/api"

interface Prompt {
  id: string
  name: string
  agent: string
  version: number
  text: string
  createdAt: string
  performance: number
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const data = await fetchPrompts()
        setPrompts(data)
      } catch (error) {
        console.error("Failed to fetch prompts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPrompts()
  }, [])

  const handleSavePrompt = (updatedPrompt: Prompt) => {
    setPrompts(prompts.map((p) => (p.id === updatedPrompt.id ? updatedPrompt : p)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-6 md:py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Prompts Management</h1>
            <p className="text-sm md:text-base text-gray-600">Edit and manage prompts for your agents</p>
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
                <PromptsList prompts={prompts} selectedPrompt={selectedPrompt} onSelectPrompt={setSelectedPrompt} />
              )}
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              {selectedPrompt ? (
                <PromptEditor prompt={selectedPrompt} onSave={handleSavePrompt} />
              ) : (
                <div className="metric-card h-40 md:h-96 flex items-center justify-center text-gray-600">
                  Select a prompt to edit
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
