const choo = require('choo')
const model = require('./model')
const component = require('./src/components/main')

// creates choo app and appends it's tree to given element
module.exports = (element, props = {}) => {
  const app = choo()
  const view = (state, prev, send) => component(state.mdEditor, send, props)
  if (props.content) {
    model.state.content = props.content
  }
  app.model(model)
  app.router(route => [route('/', view)])
  const tree = app.start()
  element.appendChild(tree)
}
