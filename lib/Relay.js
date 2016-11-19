const EventEmitter = require('events').EventEmitter
const format = require('util').format
const redis = require('redis')

class Relay extends EventEmitter {
  constructor (options = {}) {
    super()

    this._options = options
    this._pubSubClient = null
    this._ready = false

    this._createClient()
  }

  _createClient () {
    this._pubSubClient = redis.createClient(this._options)

    // Add event listeners
    this._pubSubClient.on('ready', () => this._onPubSubClientReady())
    this._pubSubClient.on('message', (channel, message) => this._onPubSubClientMessage(channel, message))
    this._pubSubClient.on('error', (error) => this._onPubSubClientError(error))
    this._pubSubClient.on('end', () => this._onPubSubClientEnd())
  }

  _onPubSubClientReady () {
    this._ready = true
  }

  _onPubSubClientMessage (channel, message) {
    if (channel.indexOf('peers:') !== -1) {
      const peerId = channel.split(':')[1]
      this.emit('message', peerId, message)
    }
  }

  _onPubSubClientError (error) {
    this.emit('error', error)
  }

   _onPubSubClientEnd () {
     this._ready = false
   }

  addLocalPeerId (peerId) {
    return new Promise((resolve, reject) => {
      if (!this._ready) return reject(new Error('relay not ready'))
      this._pubSubClient.subscribe(format('peers:%d', peerId))
      return resolve()
    })
  }

  removeLocalPeerId (peerId) {
    return new Promise((resolve, reject) => {
      if (!this._ready) return reject(new Error('relay not ready'))
      this._pubSubClient.unsubscribe(format('peers:%d', peerId))
      return resolve()
    })
  }

  send (peerId, data) {
    return new Promise((resolve, reject) => {
      if (!this._ready) return reject(new Error('relay not ready'))
      this._pubSubClient.publish(format('peers:%d', peerId), data)
      return resolve()
    })
  }
}

exports = module.exports = Relay
