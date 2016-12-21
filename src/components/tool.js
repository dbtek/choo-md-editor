const html = require('choo/html')

module.exports = (props) => html `
  <a class="nav-item" format=${props.format} onclick=${props.onClick} title="Format selection to ${props.format}">
    <span class="icon" style="pointer-events: none;">
      <i class="material-icons">${props.icon}</i>
    </span>
  </a>
`
