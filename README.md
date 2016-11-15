# WebRTC Signaling Server for node.js

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

**signal-fire-relay-redis** is a relay for **[signal-fire](https://github.com/MichielvdVelde/signal-fire)**, a horizontally scalable
signaling server for **WebRTC**. This module can be used as a reference implementation for writing your own relays.

For more information about the actual server module, [see signal-fire](https://github.com/MichielvdVelde/signal-fire).

#### Install

Install using **npm**:

```bash
npm i signal-fire-relay-redis --save
```

#### Usage

It's easy to add the relay to **signal-fire**:

```js
const Server = require('signal-fire').Server
const Relay = require('signal-fire-relay-redis').Relay

const relay = new Relay({
  // These options are passed to `redis.createClient()`
})

// Create a server with the relay set
const server = new Server({
  relay: relay
})
```

That's all!

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

#### License

Copyright 2016 [Michiel van der Velde](http://www.michielvdvelde.nl).

This software is licensed under the [MIT License](MIT).
