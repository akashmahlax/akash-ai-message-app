'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateResponse(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    return { message: text, error: null }
  } catch (error) {
    console.error('Error generating response:', error)
    return { message: null, error: 'Failed to generate response. Please try again.' }
  }
}

