import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { ReadStream, createReadStream } from 'node:fs'
import { openAI } from '../lib/openai'

const validationErrors: z.ZodIssue[] = []
let videoId = ''
let prompt = ''

const paramsSchema = z.object({
  videoId: z.string().uuid(),
})

const bodySchema = z.object({
  prompt: z.string(),
})

async function getVideoById(id: string) {
  return await prisma.videos.findUniqueOrThrow({
    where: {
      id,
    },
  })
}

async function getOpenAITranscription(stream: ReadStream) {
  return await openAI.audio.transcriptions.create({
    file: stream,
    model: 'whisper-1',
    language: 'en',
    response_format: 'json',
    temperature: 0,
    prompt,
  })
}

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (request, response) => {
    try {
      videoId = paramsSchema.parse(request.params).videoId
    } catch (err) {
      if (err instanceof z.ZodError) validationErrors.push(err.issues[0])
    }

    try {
      prompt = bodySchema.parse(request.body).prompt
    } catch (err) {
      if (err instanceof z.ZodError) validationErrors.push(err.issues[0])
    }

    if (validationErrors.length)
      return response.status(400).send(validationErrors)

    const video = getVideoById(videoId)
    const videoPath = (await video).path
    const audioReadStream = createReadStream(videoPath)
    const transcription = (await getOpenAITranscription(audioReadStream)).text

    await prisma.videos.update({
      where: {
        id: videoId,
      },
      data: {
        transcription,
      },
    })

    return transcription
  })
}
