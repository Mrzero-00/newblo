import * as React from 'react';
import { createReactEditorJS } from 'react-editor-js';
import {EDITOR_JS_TOOLS} from './edtiorJsTools';

const EditorJs = createReactEditorJS();

function ReadingEditor({text}){
  const instanceRef = React.useRef(null);
  


  const handleInitialize = React.useCallback((instance) => {
    instanceRef.current = instance
  }, [])


    return(
        <div style={{width:"100%"}}>
            <EditorJs
              readOnly={true}
              data={text}
              tools={EDITOR_JS_TOOLS}
          />
        </div>
    )
}

export default ReadingEditor;
