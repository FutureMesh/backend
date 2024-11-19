'use strict';

module.exports = {
  predict: {
    type: 'post',
    handler: async ({ form, language, fastify }) => {
      const chat = fastify.openai.createChat({
        system: fastify.config.openai.system + 'Give an answer in ' + language,
      });
      const answer = await chat.message({ text: form });
      return { answer };
    },
  },
};
