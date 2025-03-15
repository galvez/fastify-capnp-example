import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import * as capnp from 'capnp-es'
import { Basic } from './basic.js'

async function getServer () {
  const server = Fastify()

  await server.register(FastifyVite, {
    root: import.meta.url,
    spa: true
  })

  server.get('/', (req, reply) => {
    return reply.html()
  })

  server.addContentTypeParser('application/x-capnp', { 
    parseAs: 'buffer'
  }, (_, body, done) => done(null, body))

  server.post('/decode', async (req, reply) => {
    const message = new capnp.Message(req.body, false);
    const obj = message.getRoot(Basic)
    reply.send({ 
      name: obj.name, 
      email: obj.email
    })
  })

  await server.vite.ready()

  return server
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const server = await getServer()
  await server.listen({ port: 3000 })
}