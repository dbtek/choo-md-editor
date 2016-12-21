(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var choo = require('choo');
var model = require('./model');
var component = require('./src/components/main');

// creates choo app and appends it's tree to given element
module.exports = function (element, props) {
  var app = choo();
  var view = function (state, prev, send) {
    return component(state.mdEditor, send, props);
  };
  app.model(model);
  app.router(function (route) {
    return [route('/', view)];
  });
  var tree = app.start();
  element.appendChild(tree);
};

},{"./model":undefined,"./src/components/main":6,"choo":4}],2:[function(require,module,exports){
module.exports = require('./src/components/main');

},{"./src/components/main":6}],3:[function(require,module,exports){
module.exports = require('./src/model');

},{"./src/model":11}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
var _templateObject = _taggedTemplateLiteral(['\n      <div class="editor content">\n        <textarea class="textarea" placeholder="Github flavored markdown supported" onchange=', ' onkeyup=', '>', '</textarea>\n      </div>\n    '], ['\n      <div class="editor content">\n        <textarea class="textarea" placeholder="Github flavored markdown supported" onchange=', ' onkeyup=', '>', '</textarea>\n      </div>\n    ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = require('choo/html');
var marked = require('marked');

/* global Event */

module.exports = function (state, send, props) {
  if (props && props.onChange) {
    props.onChange(state.content);
  }

  var handleContentChange = function (content) {
    send('mdEditor:updateText', content);
    if (props && props.onChange) {
      props.onChange(content);
    }
  };

  var handleKeyUp = function (e) {
    var txtarea = e.target;
    switch (e.keyCode) {
      case 13:
        // enter pressed
        var beginContent = txtarea.value.substring(0, txtarea.selectionStart - 1);
        var endContent = txtarea.value.substring(txtarea.selectionStart);
        var lindex = beginContent.lastIndexOf('\n') + 1;
        var lastLine = beginContent.substring(lindex);
        switch (lastLine[0]) {
          case '-':
            txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) + '- ' + endContent.substring();
            // manually fire change event
            txtarea.dispatchEvent(new Event('change'));
            break;
        }
    }
  };

  if (state.mode === 'EDIT') {
    var editor = html(_templateObject, function (e) {
      return handleContentChange(e.target.value);
    }, handleKeyUp, state.content);
    return editor;
  } else {
    var el = document.createElement('div');
    el.className = 'content md-preview';
    el.innerHTML = marked(state.content);
    return el;
  }
};

},{"choo/html":4,"marked":4}],6:[function(require,module,exports){
var _templateObject = _taggedTemplateLiteral(['\n  <div class="md-editor">\n    ', '\n    ', '\n  </div>\n'], ['\n  <div class="md-editor">\n    ', '\n    ', '\n  </div>\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = require('choo/html');
var editor = require('./editor');
var toolbar = require('./toolbar');

module.exports = function (state, send, props = {}) {
  return html(_templateObject, toolbar(state, send), editor(state, send, props));
};

},{"./editor":5,"./toolbar":9,"choo/html":4}],7:[function(require,module,exports){
var _templateObject = _taggedTemplateLiteral(['\n    <div class="nav-left is-toggle">\n      <a class="nav-item is-tab ', '" onclick=', '>Edit</a>\n      <a class="nav-item is-tab ', '" onclick=', '>Preview</a>\n    </div>\n  '], ['\n    <div class="nav-left is-toggle">\n      <a class="nav-item is-tab ', '" onclick=', '>Edit</a>\n      <a class="nav-item is-tab ', '" onclick=', '>Preview</a>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = require('choo/html');

module.exports = function (state, send) {
  var handleTabClick = function (mode) {
    switch (mode) {
      case 'EDIT':
        send('mdEditor:activateEditMode');
        break;
      case 'PREVIEW':
        send('mdEditor:activatePreviewMode');
    }
  };

  return html(_templateObject, state.mode === 'EDIT' ? 'is-active' : '', function (e) {
    return handleTabClick('EDIT');
  }, state.mode === 'PREVIEW' ? 'is-active' : '', function (e) {
    return handleTabClick('PREVIEW');
  });
};

},{"choo/html":4}],8:[function(require,module,exports){
var _templateObject = _taggedTemplateLiteral(['\n  <a class="nav-item" format=', ' onclick=', ' title="Format selection to ', '">\n    <span class="icon" style="pointer-events: none;">\n      <i class="material-icons">', '</i>\n    </span>\n  </a>\n'], ['\n  <a class="nav-item" format=', ' onclick=', ' title="Format selection to ', '">\n    <span class="icon" style="pointer-events: none;">\n      <i class="material-icons">', '</i>\n    </span>\n  </a>\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = require('choo/html');

module.exports = function (props) {
  return html(_templateObject, props.format, props.onClick, props.format, props.icon);
};

},{"choo/html":4}],9:[function(require,module,exports){
var _templateObject = _taggedTemplateLiteral(['\n    <div class="controls nav is-inverted">\n      ', '\n      <div class="nav-center"></div>\n      <div class="nav-right">\n        ', '\n      </div>\n    </div>\n  '], ['\n    <div class="controls nav is-inverted">\n      ', '\n      <div class="nav-center"></div>\n      <div class="nav-right">\n        ', '\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var html = require('choo/html');
var tool = require('./tool');
var tabs = require('./tabs');
var formatter = require('../formatter');

/* global Event */

module.exports = function (state, send) {
  var handleFormatter = function (e) {
    var format = e.target.getAttribute('format');
    var txtarea = e.target.parentElement.parentElement.parentElement.querySelector('textarea');
    var start = txtarea.selectionStart;
    // obtain the index of the last selected character
    var finish = txtarea.selectionEnd;
    // obtain the selected text
    var content = txtarea.value;
    var sel = content.substring(start, finish);
    var newContent = formatter.trim(content.substring(0, start) + formatter.formatTo(format, sel) + content.substring(finish));
    txtarea.value = newContent;
    // manually fire change event
    txtarea.dispatchEvent(new Event('change'));
  };

  var tools = state.mode === 'EDIT' ? formatter.tools.map(function (t) {
    return tool({ format: t.format, icon: t.icon, onClick: handleFormatter });
  }) : '';

  return html(_templateObject, tabs(state, send), tools);
};

},{"../formatter":10,"./tabs":7,"./tool":8,"choo/html":4}],10:[function(require,module,exports){
/**
 * Supported WYSIWYG tools
 */

var trim = function (str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
exports.trim = trim;

/**
 * Default strings to be used with tools if no selection is made.
 * @type {Object}
 */
var defaultStrings = {
  title: 'Heading',
  italic: 'italic text',
  bold: 'bold text',
  link: 'link text',
  image: 'alt',
  quote: 'Blockqoute',
  list: 'List item',
  orderedlist: 'List item',
  strikethrough: 'obsolete text'
};

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
}];

/**
 * Markdown formatter
 * @param {String} format   Format type.
 * @param {String} str      Sub string to be formatted.
 * @return {String}         Formatted string.
 */
exports.formatTo = function (format, str) {
  if (str === '') {
    str = defaultStrings[format] || '';
  }
  str = trim(str);

  switch (format) {
    case 'title':
      return '\n\n' + str + '\n----\n\n';
    case 'italic':
      return '*' + str + '*';
    case 'bold':
      return '**' + str + '**';
    case 'link':
      return '[' + str + '](http://example.com)';
    case 'image':
      return '![' + str + '](http://example.com/logo.png)';
    case 'quote':
      return '\n\n> ' + str + '\n\n';
    case 'list':
      return '\n\n- ' + str + '\n\n';
    case 'orderedlist':
      return '\n\n1. ' + str + '\n\n';
    case 'strikethrough':
      return '~~' + str + '~~';
    default:
      return str;
  }
};

},{}],11:[function(require,module,exports){
var assign = require('lodash/assign');

module.exports = {
  namespace: 'mdEditor',
  state: {
    mode: 'EDIT',
    content: ''
  },
  reducers: {
    updateText: function (data, state) {
      return assign({}, state, { content: data });
    },
    activateEditMode: function (t, state) {
      return assign({}, state, { mode: 'EDIT' });
    },
    activatePreviewMode: function (t, state) {
      return assign({}, state, { mode: 'PREVIEW' });
    }
  }
};

},{"lodash/assign":4}]},{},[1,2,3]);
