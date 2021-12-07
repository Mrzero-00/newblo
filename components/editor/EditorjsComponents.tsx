import * as React from 'react';
import { createReactEditorJS } from 'react-editor-js';
import {EDITOR_JS_TOOLS} from './edtiorJsTools';

const EditorJs = createReactEditorJS();

function EditorjsComponents({text,setText}){
  const instanceRef = React.useRef(null);
  
  async function handleSave() {
    const savedData = await instanceRef.current.save();
    setText(savedData);
  }

  const handleInitialize = React.useCallback((instance) => {
    instanceRef.current = instance
  }, [])


    return(
        <div style={{width:"100%"}}>
            <EditorJs
              onChange={handleSave}
              onInitialize={handleInitialize}
              instanceRef={(instance:any) => (instanceRef.current = instance)}
              data={text}
              tools={EDITOR_JS_TOOLS}
          />
        </div>
    )
}

export default EditorjsComponents;

