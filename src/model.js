const assign = require('lodash/assign')

module.exports = {
  namespace: 'mdEditor',
  state: {
    mode: 'EDIT',
    content: ''
  },
  reducers: {
    updateText: (data, state) => assign({}, state, {content: data}),
    activateEditMode: (t, state) => assign({}, state, {mode: 'EDIT'}),
    activatePreviewMode: (t, state) => assign({}, state, {mode: 'PREVIEW'})
  }
}
