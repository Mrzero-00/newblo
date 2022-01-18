// @flow
import * as React from 'react';
import {useState,useEffect,useRef} from "react";
import Link from 'next/link';
import dynamic from 'next/dynamic';
const EditorjsComponents = dynamic(()=>import("../components/editor/EditorjsComponents.js"),{ssr:false});
//const Editor_dante = dynamic(()=>import("../components/editor/Editor_dante.js"),{ssr:false});
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';



function Editor(){
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [text,setText] = useState("");
    const [thumbnail,setThumbnail] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [titleEnter,setTitleEnter] =useState(false);
    const [summaryEnter,setSummaryEnter] =useState(false);
    const [prePage,setPrePage] =useState("");

    const handleChange_title=(e)=>{
        if(!titleEnter){
            setTitle(e.target.value);
        }
    }

    const handleChange_summary=(e)=>{
        if(!summaryEnter){
            setSummary(e.target.value);
        }
    }

    const thumbnailLogic = ()=>{
        const editorBox = document.querySelector(".codex-editor__redactor");
            for(let i=0 ; i<editorBox?.children.length; i++){
                if(editorBox?.children[i].children[0].children[0].classList[0]==="cdx-block"){
                    if(editorBox?.children[i].children[0].children[0].children[0].classList[0]==="image-tool__image"){
                        if(editorBox?.children[i].children[0].children[0].children[0].children[1]){
                            return (editorBox?.children[i].children[0].children[0].children[0].children[1]).src;
                        }
                    }
                }
            }
    }



    useEffect(()=>{
        setIsLoading(true);
        if(sessionStorage.getItem("user_info")){

        }else{
            // const alink = document.createElement("a");
            // alink.href="/";
            // alink.click();    
        }
        setPrePage(sessionStorage.getItem('pre_url'));
    },[])

    useEffect(()=>{
        setThumbnail(thumbnailLogic());
    },[text])

    const writeSendApi = async()=>{   
        const data = new FormData();
        //data.append("type","createBlog");
        data.append("email",JSON.parse(sessionStorage.getItem("user_info")).email);
        //data.append("hash",JSON.parse(sessionStorage.getItem("user_info")).hash);
        data.append("blogName",JSON.parse(sessionStorage.getItem("user_info")).blogName);
        data.append("thumbnail",thumbnail);
        data.append("title",title);
        data.append("summary",summary);
        data.append("mainText",JSON.stringify(text));
        //data.append("category","");
        try{
            await axios(
            {
                method:"post",
                url:"/api/post/postAdd",
                data
            }
            ).then((e)=>{
                console.log(e);
                if(e.data.code ==="0000"){
                    const alink = document.createElement("a");
                    alink.href = e.data.data.articlesUrl;
                    alink.click();
                }else{
                }
            })
        }catch{
        }
    }
    console.log("dd");
    return(
        <div className='editorPage'>
            <div style={{width:"100%",height:"72px",marginBottom:"8px",display:"flex",justifyContent:"space-between",padding:"0px 48px",alignItems:"center"}}>
                <div>{""}</div>
                <div style={{display:"flex"}}>
                    <div></div>
                    <Link href={prePage}>
                        <a className="editorBtn editorBtn--empty" style={{marginLeft:"16px"}}>취소</a>
                    </Link>
                    <div className="editorBtn editorBtn--black" style={{marginLeft:"8px"}} onClick={writeSendApi}>발행하기</div>
                </div>
            </div>
            <div className="editorTitle">
                <TextareaAutosize onChange={(e)=>{handleChange_title(e)}} value={title} onKeyDown={(e)=>{if(e.keyCode===13){setTitleEnter(true)}else{setTitleEnter(false)}}} placeholder="제목을 입력하세요"></TextareaAutosize>
            </div>
            <div className="editorSummary">
                <TextareaAutosize onChange={(e)=>{handleChange_summary(e)}} value={summary} onKeyDown={(e)=>{if(e.keyCode===13){setSummaryEnter(true)}else{setSummaryEnter(false)}}} placeholder="요약글을 작성해주세요"></TextareaAutosize>
            </div>
            <div className="editorText">
                {/* <Editor_dante setText={setText} text={text}></Editor_dante> */}
                <EditorjsComponents setText={setText} text={text}/>
            </div>
        </div>
    )
}

export default Editor;