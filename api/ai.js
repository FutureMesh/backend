'use strict';

module.exports = {
  ask: {
    type: 'post',
    handler: async ({ question, fastify }) => {
      const chat = fastify.openai.createChat();
      const response = await chat.message({ text: question });
      return { reply: response };
    },
  },
};
