'use strict';

function init(fastify, routes) {
  for (const [iface, methods] of Object.entries(routes)) {
    for (const [name, method] of Object.entries(methods)) {
      const { type, handler } = method;

      fastify[type](`/api/${iface}/${name}`, async (request) => {
        console.log('req');
        const { query, body } = request;
        console.log(query);
        return await handler({ ...body, fastify }).catch((error) => {
          const message = error?.message || 'Internal error';
          fastify.log.error(`${name} error: ${message}`);
          return { message: 'Internal error' };
        });
      });
    }
  }
}

module.exports = { init };
