// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
fastify.register(require('@fastify/cors'), {});

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})
/*  cambio en clase 13 44:46
fastify.post('/registro', async (request, reply) => {
    //request.query - datos desde GET
    const datos = request.body // ---> datos que vienen directamente del formulario o en modo jason usando la funcion fetch.
    return(datos);
})
 */
fastify.post('/registro', require('./src/registro.js'));
fastify.post('/login', require('./src/login.js'));
fastify.get('/usuario/checktoken', require('./src/checktoken.js'));

/* API para CRUD categorias*/
fastify.route({
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  url: '/categoria',
  handler: require('./src/categoria')
});

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