'use strict';

const EventEmitter = require('node:events');
const fp = require('fastify-plugin');

class Session {
  constructor(token, data) {
    this.token = token;
    this.state = { ...data };
  }
}

const sessions = new Map(); // token: Session

class Client extends EventEmitter {
  constructor() {
    super();
    this.session = null;
  }

  finalizeSession() {
    if (!this.session) return false;
    sessions.delete(this.session.token);
    this.session = null;
    return true;
  }

  restoreSession(token) {
    const session = sessions.get(token);
    if (!session) return false;
    this.session = session;
    return true;
  }

  initializeSession(token, data = {}) {
    this.finalizeSession();
    this.session = new Session(token, data);
    sessions.set(token, this.session);
    return token;
  }

  destroy() {
    this.emit('close');
    this.finalizeSession();
  }
}

const clientPlugin = async (fastify) => {
  const session = {};
  session.createSession = () => new Client();
  fastify.decorate('session', session);
};

module.exports = fp(clientPlugin, {
  fastify: '4.x',
});
