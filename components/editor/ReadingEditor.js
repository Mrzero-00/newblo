import * as React from 'react';
import { createReactEditorJS } from 'react-editor-js';
import {EDITOR_JS_TOOLS} from './edtiorJsTools';

const EditorJs = createReactEditorJS();

function ReadingEditor({text}){
    return(
        <div style={{width:"100%",marginTop:"32px"}}>
            <EditorJs
              readOnly={true}
              data={text}
              tools={EDITOR_JS_TOOLS}
          />
        </div>
    )
}

export default ReadingEditor;

