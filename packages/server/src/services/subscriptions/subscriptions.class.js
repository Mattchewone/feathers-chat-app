/* eslint-disable no-unused-vars */
exports.Subscriptions = class Subscriptions {
  constructor (options) {
    this.options = options || {}
  }

  async create ({ roomName }, params) {
    if (params.connection) {
      this.app.channel(`room/${roomName}`).join(params.connection)
    }

    return roomName
  }

  async remove (roomName, params) {
    if (params.connection) {
      this.app.channel(`room/${roomName}`).leave(params.connection)
    }

    return roomName
  }

  setup (app) {
    this.app = app
  }
}
