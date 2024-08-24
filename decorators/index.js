'use strict';

module.exports = (fastify, config) => {
  fastify.decorate('config', config);
};
