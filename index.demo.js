const mdEditor = require('./src/app.js')

// instantiate app
mdEditor.app(document.getElementById('root'), {onChange: (val) => console.debug(val)})
