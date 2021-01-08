import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-palenight.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/keymap/vim.js';

import {markdown} from 'markdown';

// Mousetrap for key binding
import mousetrap from 'mousetrap'
import 'mousetrap-global-bind'

// Config Vim key binding
CodeMirror.Vim.map("jk", "<Esc>", "insert");
const NEW_NOTE = 'ctrl+alt+n'


const useKey = (key , action) => {
  const actionRef = React.useRef(() => {});
  actionRef.current = action

  React.useEffect(() => {
    mousetrap.bindGlobal(key, (event) => {
      event.preventDefault()
      if (actionRef.current) {
        actionRef.current()
      }
    })

    return () => mousetrap.unbind(key)
  }, [key])
}



const EmptyEditor = () => {
  return (
    <div id='empty-editor'>
      <div className='prompt'>
        <p>
          <strong>Create a note</strong>
        </p>
        <p>
          <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
        </p>
        <p>
          <strong>VIM Cheat Sheet</strong>
        </p>
        <ul>
          <li><kbd>i</kbd> - insert mode</li>
          <li><kbd>ESC</kbd> - visual mode</li>
          <li><kbd>h</kbd> - move cursor left</li>
          <li><kbd>j</kbd> - move cursor down</li>
          <li><kbd>k</kbd> - move cursor up</li>
          <li><kbd>l</kbd> - move cursor right</li>
        </ul>
      </div>
    </div>
  )
}

const App = () => {
  const $editorRef = React.useRef();
  const [preview, setPreview] = React.useState()
  const [text, setText] = React.useState('');
  const [activeNote, setActive] = React.useState(false);

  useKey(NEW_NOTE, () => setActive(prev => !prev));


  React.useEffect(() => {
    const cm = CodeMirror($editorRef.current, {
      lineNumbers: true,
      showCursorWhenSelecting: true,
      keyMap: 'vim',
      theme: 'material-palenight',
      mode: 'gfm'
    })
    cm.focus();

    const executeCode = (editor) => {
      const value = editor.getValue();
      setText(value);
    }
    const saveKey = {
      'Ctrl-Enter': executeCode,
    }
    cm.addKeyMap(saveKey)
  },[activeNote])

  React.useEffect(() => {
    const output = markdown.toHTML(text);
    setPreview(output)
  
  },[text])
  
  
  return (
  <>
    <div className="container">
      <div id="editor-container">
        {activeNote ? <div id="editor" ref={$editorRef}/> : <EmptyEditor/>}
        <div className='editor-menu'> press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to preview</div>
      </div>
      <div id="preview" dangerouslySetInnerHTML={{__html:preview}} >
      </div>
    </div>
  </>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));