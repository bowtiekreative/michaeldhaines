'use strict';

// Hostinger's "startup file" sometimes defaults to app.js. Delegate to server.js
// so either entry point boots the same app.
module.exports = require('./server.js');
