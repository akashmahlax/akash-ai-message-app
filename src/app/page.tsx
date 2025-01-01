'use client'

import { useState } from 'react'
import { Bot, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { generateResponse } from './actions'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    // Get AI response
    const response = await generateResponse(userMessage)
    
    setIsLoading(false)

    // Add AI response to chat
    if (response.message) {
      setMessages(prev => [...prev, { role: 'assistant', content: response.message }])
    } else if (response.error) {
      setMessages(prev => [...prev, { role: 'assistant', content: response.error }])
    }
  }

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-blue-500 text-white">
          <CardTitle className="text-2xl font-bold">Khalsa Ai</CardTitle>
        </CardHeader>
        <CardContent className="bg-gray-100">
          <div className="space-y-4 mb-4 h-[500px] overflow-y-auto p-4 rounded-lg bg-white shadow-inner">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2.5 ${
                  message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {message.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div
                  className={`p-4 rounded-lg max-w-[80%] ${
                    message.role === 'assistant'
                      ? 'bg-gray-200'
                      : 'bg-primary text-primary-foreground ml-auto'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot size={18} />
                </div>
                <div className="p-4 rounded-xl bg-gray-200">
                  <p>Akash Thinking...</p>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-xl p-2"
              rows={1}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
