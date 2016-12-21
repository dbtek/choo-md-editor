const html = require('choo/html')
const editor = require('./editor')
const toolbar = require('./toolbar')

module.exports = (state, send, props = {}) => html `
  <div class="md-editor">
    ${toolbar(state, send)}
    ${editor(state, send, props)}
  </div>
`
