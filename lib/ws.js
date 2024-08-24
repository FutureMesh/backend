'use strict';

function init(fastify, routes) {
  fastify.register(require('@fastify/websocket'));
  fastify.register(async (fastify) => {
    fastify.get('/api', { websocket: true }, (socket) => {
      socket.on('message', async (message) => {
        try {
          const { service, method, args = [] } = JSON.parse(message);
          const handler = routes?.[service]?.[method];
          if (!handler) return socket.send('"Not found"', { binary: false });
          const result = await handler({ ...args, fastify });
          socket.send(JSON.stringify(result), { binary: false });
        } catch (err) {
          fastify.log.error(err);
          socket.send('"Server error"', { binary: false });
        }
      });
    });
  });
}
module.exports = { init };
