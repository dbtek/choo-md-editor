const html = require('choo/html')
const tool = require('./tool')
const tabs = require('./tabs')
const formatter = require('../formatter')

/* global Event */

module.exports = (state, send) => {
  const handleFormatter = (e) => {
    const format = e.target.getAttribute('format')
    let txtarea = e.target.parentElement.parentElement.parentElement.querySelector('textarea')
    const start = txtarea.selectionStart
    // obtain the index of the last selected character
    const finish = txtarea.selectionEnd
    // obtain the selected text
    let content = txtarea.value
    const sel = content.substring(start, finish)
    const newContent = formatter.trim(content.substring(0, start) + formatter.formatTo(format, sel) + content.substring(finish))
    txtarea.value = newContent
    // manually fire change event
    txtarea.dispatchEvent(new Event('change'))
  }

  const tools = (state.mode === 'EDIT') ? formatter.tools.map(t => tool({format: t.format, icon: t.icon, onClick: handleFormatter})) : ''

  return html `
    <div class="controls nav is-inverted">
      ${tabs(state, send)}
      <div class="nav-center"></div>
      <div class="nav-right">
        ${tools}
      </div>
    </div>
  `
}
