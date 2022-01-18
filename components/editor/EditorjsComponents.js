import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import {EDITOR_JS_TOOLS} from './edtiorJsTools';

let EditorJs = createReactEditorJS();

function EditorjsComponents({text,setText}){
  const instanceRef = useRef({
    save : ()=>{
    }
  });
  
  async function handleSave() {
    let savedData;
    if(instanceRef!==null){
      savedData = await instanceRef?.current.save();
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
              instanceRef={(instance) => (instanceRef.current = instance)}
              data={text}
              placeholder={"내용을 입력하세요"}
              tools={EDITOR_JS_TOOLS}
          />
        </div>
    )
}

export default EditorjsComponents;

