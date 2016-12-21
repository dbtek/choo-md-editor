const mdEditor = require('./app.js')

// instantiate app
mdEditor(document.getElementById('root'), {content: 'Markdown, *that simple*.', onChange: (val) => console.debug(val)})
