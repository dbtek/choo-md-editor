const mdEditor = require('choo-md-editor')

// instantiate app
mdEditor(document.getElementById('root'), {
  onChange: (val) => console.debug(val),
  content: "It's Markdown. That **simple**."
})
