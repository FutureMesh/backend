'use strict';

module.exports = {
  predict: {
    type: 'post',
    handler: async ({ form, language, token, fastify }) => {
      if (!token) return { error: 'Token is required' };
      const client = fastify.session.createSession();
      const exists = client.restoreSession(token);
      if (exists) client.finalizeSession();
      const chat = fastify.openai.createChat({
        system: fastify.config.openai.system + 'Give an answer in ' + language,
      });
      const answer = await chat.message({ text: form });
      client.initializeSession(token, { chat });
      return { answer };
    },
  },
  ask: {
    type: 'post',
    handler: async ({ question, fastify, token, langauge }) => {
      if (!token) return { error: 'Token is required' };
      const client = fastify.session.createSession();
      const exists = client.restoreSession(token);
      if (!exists) return { error: 'Session doesnt exist' };
      const { chat } = client.session.state;
      if (chat.messages.length > 50) chat.messages.slice(-50);
      const answer = await chat.message({
        text: question + 'Answer this question in ' + langauge,
      });
      return { answer };
    },
  },
  leave: {
    type: 'post',
    handler: async ({ token, fastify }) => {
      if (!token) return { error: 'Token is required' };
      const session = await fastify.session.createSession();
      const exists = session.restoreSession(token);
      if (!exists) return { error: 'Session not found' };
      session.finalizeSession();
      return { success: true };
    },
  },
};
