import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-palenight.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/keymap/vim.js';

import {markdown} from 'markdown';


// Config Vim key binding
CodeMirror.Vim.map("jk", "<Esc>", "insert")

const App = () => {
  const $editorRef = React.useRef();
  const [preview, setPreview] = React.useState()
  const [text, setText] = React.useState('');


  React.useEffect(() => {
    const cm = CodeMirror($editorRef.current, {
      lineNumbers: true,
      showCursorWhenSelecting: true,
      keyMap: 'vim',
      theme: 'material-palenight',
      mode: 'gfm'
    })

    const executeCode = (editor) => {
      const value = editor.getValue();
      setText(value);
    }
    const saveKey = {
      'Ctrl-Enter': executeCode,
    }
    cm.addKeyMap(saveKey)
  },[])

  React.useEffect(() => {
    const output = markdown.toHTML(text);
    setPreview(output)
  
  },[text])
  
  
  return (
  <>
    <div className="container">
      <div id="editor-container">
        <div id="editor" ref={$editorRef}/>
        <div class='editor-menu'> press Ctrl + enter to preview</div>
      </div>
      <div id="preview" dangerouslySetInnerHTML={{__html:preview}} >
      </div>
    </div>
  </>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));