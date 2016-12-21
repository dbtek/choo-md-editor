const mdEditor = require('./src/app.js')

// instantiate app
mdEditor(document.getElementById('root'), {onChange: (val) => console.debug(val)})
