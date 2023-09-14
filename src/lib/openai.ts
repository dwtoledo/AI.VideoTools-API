import { OpenAI } from 'openai'
import 'dotenv/config'

export const openAI = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
})
