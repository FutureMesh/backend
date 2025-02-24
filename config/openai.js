'use strict';

module.exports = {
  enabled: true,
  system: process.env['AI_FUTURE_PROMPT'] || '',
  chat: {
    model: 'gpt-4o-mini',
  },
};
