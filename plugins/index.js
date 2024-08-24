'use strict';

const path = require('node:path');
const corsPlugin = require('@fastify/cors');
const formbodyPlugin = require('@fastify/formbody');
const fastifyStaticPlugin = require('@fastify/static');

// const openaiPlugin = require('./openai.js');

module.exports = (fastify) => {
  // const { config } = fastify;
  fastify.register(require('@fastify/cookie'));
  //   fastify.register(session, {
  //      secret: 'a secret with minimum length of 32 characters'
  //    });

  fastify.register(corsPlugin, { origin: '*' });
  fastify.register(formbodyPlugin);
  fastify.register(fastifyStaticPlugin, {
    root: path.join(process.cwd(), './static'),
    prefix: '/',
  });

  // fastify.register(openaiPlugin, config.llm.openai);
};
