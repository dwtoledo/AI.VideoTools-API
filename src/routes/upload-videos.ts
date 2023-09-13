import { FastifyInstance } from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import { prisma } from '../lib/prisma'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import fs from 'node:fs'

const maxVideoFileSizeInMb = 25
const pump = promisify(pipeline)

export async function uploadVideosRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * maxVideoFileSizeInMb,
    },
  })

  app.post('/videos', async (request, response) => {
    const data = await request.file()

    if (!data) return response.status(400).send({ error: 'Missing file input' })

    const extension = path.extname(data.filename)

    if (extension !== '.mp3')
      return response
        .status(400)
        .send({ error: 'Invalid input type, please upload a MP3.' })

    const fileBaseName = path.basename(data.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
    const uploadDestination = path.resolve(
      __dirname,
      '../../tmp',
      fileUploadName,
    )

    await pump(data.file, fs.createWriteStream(uploadDestination))

    const video = await prisma.videos.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      },
    })

    return { video }
  })
}
