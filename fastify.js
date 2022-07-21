import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async (request, reply) => {
	return { hello: 'world' }
})

const opts = {}
fastify.post('/print', opts, async (request, reply) => {
	console.log(request.body)
	console.log(request.querystring)
	return { hello: 'print' }
})

// Run the server!
const start = async () => {
	try {
		await fastify.listen({ port: 3000 })
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()
