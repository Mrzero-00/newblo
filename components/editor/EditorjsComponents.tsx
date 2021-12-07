import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import {EDITOR_JS_TOOLS} from './edtiorJsTools';

let EditorJs = createReactEditorJS();

function EditorjsComponents({text,setText}){
  const instanceRef = useRef({
    save : ()=>{
      console.log("초기");
    }
  });
  
  async function handleSave() {
    let savedData;
    console.dir(instanceRef.current);
    if(instanceRef!==null){
      savedData = await instanceRef.current.save();
      setText(savedData);
    }
  }

  const handleInitialize = React.useCallback((instance) => {
    instanceRef.current = instance;
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

