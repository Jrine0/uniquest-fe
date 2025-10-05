'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { Send, User, Bot, FileText, Zap, MessageSquare } from 'lucide-react'

// Define the structure of a message in the chat
interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: SourceDocument[]
  confidence?: number
}

// Define the structure of a source document
interface SourceDocument {
  doc_id: string
  chunk_id: string
  title: string
  text: string
  score: number
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => crypto.randomUUID()) // Simple session management
  
  const { user } = useUser()
  const { getToken } = useAuth()
  
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])
  
  // Handle form submission to send a query to the backend
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !user) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const token = await getToken()
      const formData = new FormData()
      formData.append('text', input)
      formData.append('user_id', user.id)
      formData.append('session_id', sessionId)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/query/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail?.message || 'Something went wrong')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        sources: data.source_documents,
        confidence: data.confidence,
      }
      setMessages((prev) => [...prev, assistantMessage])
      
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: error instanceof Error ? error.message : 'Sorry, an unexpected error occurred.',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)]">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex-grow flex flex-col justify-center items-center text-center p-6">
            <div className="w-52 h-52 rounded-lg flex items-center justify-center">
              <img src="/uniquest.png" alt="Unique" className="w-full h-full object-cover rounded-lg" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome to UniQuest</h1>
            <p className="text-gray-600 mt-2 max-w-md">
                Ask me anything about admissions, scholarships, or campus life. 
                I'm here to provide instant answers from official documents.
            </p>
        </div>
      )}

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {/* Assistant Avatar */}
            {msg.role === 'assistant' && (
              <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={20} />
              </div>
            )}

            <div className={`max-w-xl p-4 rounded-xl ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              
              {/* Source Documents */}
              {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">SOURCES:</h4>
                  <div className="space-y-2">
                    {msg.sources.map(source => (
                      <div key={source.chunk_id} className="bg-gray-50 p-2 rounded-md border border-gray-200">
                        <p className="text-xs text-gray-800 font-medium truncate">
                          <FileText className="inline w-3 h-3 mr-1.5" />
                          {source.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.role === 'user' && (
              <div className="w-9 h-9 bg-gray-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <User size={20} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={20} />
                </div>
                <div className="max-w-xl p-4 rounded-xl bg-white border border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
      </div>
      
      {/* Input Form */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about our university..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
