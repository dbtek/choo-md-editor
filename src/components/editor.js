const html = require('choo/html')
const marked = require('marked')

/* global Event */

module.exports = (state, send, props) => {
  if (props && props.onChange) {
    props.onChange(state.content)
  }

  const handleContentChange = (content) => {
    send('mdEditor:updateText', content)
    if (props && props.onChange) { props.onChange(content) }
  }

  const handleKeyUp = (e) => {
    let txtarea = e.target
    switch (e.keyCode) {
      case 13:
        // enter pressed
        let beginContent = txtarea.value.substring(0, txtarea.selectionStart - 1)
        let endContent = txtarea.value.substring(txtarea.selectionStart)
        const lindex = beginContent.lastIndexOf('\n') + 1
        let lastLine = beginContent.substring(lindex)
        switch (lastLine[0]) {
          case '-':
            txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) + '- ' + endContent.substring()
            // manually fire change event
            txtarea.dispatchEvent(new Event('change'))
            break
        }
    }
  }

  if (state.mode === 'EDIT') {
    const editor = html `
      <div class="editor content">
        <textarea class="textarea" placeholder="Github flavored markdown supported" onchange=${e => handleContentChange(e.target.value)} onkeyup=${handleKeyUp}>${state.content}</textarea>
      </div>
    `
    return editor
  } else {
    let el = document.createElement('div')
    el.className = 'content md-preview'
    el.innerHTML = marked(state.content)
    return el
  }
}
