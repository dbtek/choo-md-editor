/**
 * Supported WYSIWYG tools
 */

const trim = (str) => str.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
exports.trim = trim

/**
 * Default strings to be used with tools if no selection is made.
 * @type {Object}
 */
const defaultStrings = {
  title: 'Heading',
  italic: 'italic text',
  bold: 'bold text',
  link: 'link text',
  image: 'alt',
  quote: 'Blockqoute',
  list: 'List item',
  orderedlist: 'List item',
  strikethrough: 'obsolete text'
}

// format list
exports.tools = [{
  format: 'title',
  icon: 'title'
}, {
  format: 'italic',
  icon: 'format_bold'
}, {
  format: 'bold',
  icon: 'format_italic'
}, {
  format: 'link',
  icon: 'link'
}, {
  format: 'image',
  icon: 'format_quote'
}, {
  format: 'quote',
  icon: 'image'
}, {
  format: 'list',
  icon: 'format_list_bulleted'
}, {
  format: 'orderedlist',
  icon: 'format_list_numbered'
}, {
  format: 'strikethrough',
  icon: 'format_strikethrough'
}]

/**
 * Markdown formatter
 * @param {String} format   Format type.
 * @param {String} str      Sub string to be formatted.
 * @return {String}         Formatted string.
 */
exports.formatTo = (format, str) => {
  if (str === '') {
    str = defaultStrings[format] || ''
  }
  str = trim(str)

  switch (format) {
    case 'title':
      return `\n\n${str}\n----\n\n`
    case 'italic':
      return `*${str}*`
    case 'bold':
      return `**${str}**`
    case 'link':
      return `[${str}](http://example.com)`
    case 'image':
      return `![${str}](http://example.com/logo.png)`
    case 'quote':
      return `\n\n> ${str}\n\n`
    case 'list':
      return `\n\n- ${str}\n\n`
    case 'orderedlist':
      return `\n\n1. ${str}\n\n`
    case 'strikethrough':
      return `~~${str}~~`
    default:
      return str
  }
}
