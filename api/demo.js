'use strict';

module.exports = {
  hello: {
    // access: 'public',  // FUTURE: add access control
    type: 'get',
    handler: async () => 'hello',
  },
};
