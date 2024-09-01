'use strict';

module.exports = {
  ask: {
    type: 'post',
    handler: async ({ form, fastify }) => {
      const chat = fastify.openai.createChat();
      const answer = await chat.message({ text: form.question });
      return { answer };
    },
  },
};
