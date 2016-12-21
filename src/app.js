const choo = require('choo')
const model = require('./model')
const component = require('./components/main')

// creates choo app and appends it's tree to given element
const createApp = (element, props = {}) => {
  const app = choo()
  const view = (state, prev, send) => component(state.mdEditor, send, props)
  app.model(model)
  app.router(route => [route('/', view)])
  const tree = app.start()
  element.appendChild(tree)
}

module.exports = {
  component,
  model,
  app: createApp
}
