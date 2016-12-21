Choo Markdown Editor [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
===

Markdown Editor built with Choo / for Choo. It can be used inside a Choo app or as a standalone library.

### Install
```bash
 $ npm i -S choo-md-editor
```

### Usage
choo-md-editor depends on some parts of Bulma styles. If you use Bulma in your project use `choo-md-editor.bulma.css` instead of whole `choo-md-editor.css`.

#### Standalone Library
```js
  const element = document.getElementById('editor-container')
  const editor = require('choo-md-editor')
  editor(element, {onChange: (val) => console.info('Markdown changed', val)})
```

#### Inside choo app
```js
  app = choo()
  ...
  app.model(require('choo-md-editor/model'))
  ...
  const editor = require('choo-md-editor/component')
  const mainView = (state, prev, send) => {
    html `
      <div>
        $editor(state, send)
      </div>
    `
  }
```

### Credits
 - [Choo Framework](https://github.com/yoshuawuyts/choo)
 - [Bulma CSS Framework](http://bulma.io)
 - [Marked](https://github.com/chjj/marked)

### Author
İsmail Demirbilek [@dbtek](https://twitter.com/dbtek)
