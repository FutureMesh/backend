'use strict';

module.exports = {
  predict: {
    type: 'post',
    handler: async ({ form, fastify }) => {
      const chat = fastify.openai.createChat();
      const answer = await chat.message({ text: form.question });
      return { answer };
    },
  },
};
