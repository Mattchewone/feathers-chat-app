const { authenticate } = require('@feathersjs/authentication').hooks

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      (context) => {
        context.data.createdAt = Date.now()
        return context
      },
      (context) => {
        // Add the users name to the message
        context.data.name = context.params.user.email
        return context
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
