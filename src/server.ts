import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideosRoute } from './routes/upload-videos'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAIResultRoute } from './routes/generate-ai-result'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(getAllPromptsRoute)
app.register(uploadVideosRoute)
app.register(createTranscriptionRoute)
app.register(generateAIResultRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Upload AI API Running!')
  })
