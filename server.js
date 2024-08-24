'use strict';

const initDecorators = require('./decorators/index.js');
const loadApplication = require('./lib/loader');
const initPlugins = require('./plugins/index.js');
const ws = require('./lib/ws');
const http = require('./lib/http');

const fastify = require('fastify')({ logger: true });

(async () => {
  const { api, config } = await loadApplication();
  initDecorators(fastify, config);
  initPlugins(fastify);

  ws.init(fastify, api);
  http.init(fastify, api);

  // Run the server!
  await fastify.listen({ port: config.environment.port });
  fastify.log.info(`API on port ${config.environment.port}`);
})();
