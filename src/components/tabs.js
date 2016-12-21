const html = require('choo/html')

module.exports = (state, send) => {
  const handleTabClick = (mode) => {
    switch (mode) {
      case 'EDIT':
        send('mdEditor:activateEditMode')
        break
      case 'PREVIEW':
        send('mdEditor:activatePreviewMode')
    }
  }

  return html `
    <div class="nav-left is-toggle">
      <a class="nav-item is-tab ${state.mode === 'EDIT' ? 'is-active' : ''}" onclick=${e => handleTabClick('EDIT')}>Edit</a>
      <a class="nav-item is-tab ${state.mode === 'PREVIEW' ? 'is-active' : ''}" onclick=${e => handleTabClick('PREVIEW')}>Preview</a>
    </div>
  `
}
