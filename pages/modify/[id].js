// @flow
import * as React from 'react';
import {useState,useEffect,useRef} from "react";
import Link from 'next/link';
import dynamic from 'next/dynamic';
const EditorjsComponents = dynamic(()=>import("../../components/editor/EditorjsComponents.js"),{ssr:false});
//const Editor_dante = dynamic(()=>import("../components/editor/Editor_dante.js"),{ssr:false});
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';



function Editor(){
    const [isLoading,setIsLoading] = useState(false);
    const [titleEnter,setTitleEnter] =useState(false);
    const [summaryEnter,setSummaryEnter] =useState(false);

    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [text,setText] = useState("");
    const [thumbnail,setThumbnail] = useState("");

    const autoSaveNum = useRef(0);
    const [autoSaveState,setAutoSaveState] = useState(false);
    const [prePage,setPrePage] =useState("");
    const [postNum,setPostNum] = useState("none");

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
        if(sessionStorage.getItem("user_info")){
            setPostNum(window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1));
            initPostApi(window.location.pathname.slice(window.location.pathname.lastIndexOf("/")+1));           
        }else{
            // const alink = document.createElement("a");
            // alink.href=sessionStorage.getItem('pre_url');
            // alink.click();    
        }
        setPrePage(sessionStorage.getItem('pre_url'));
    },[])

    const endSendApi = async()=>{   
        const data = new FormData();
        data.append("type","save");
        data.append("id",postNum);
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
                url:"/api/post/postModify",
                data
            }
            ).then((e)=>{
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

    const autoSendApi = async()=>{   
        const data = new FormData();
        data.append("type","draft");
        data.append("id",postNum);
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
                url:"/api/post/postModify",
                data
            }
            ).then((e)=>{
                if(e.data.code ==="0000"){
                    setAutoSaveState(true);
                }else{
                }
            })
        }catch{
        }
    }

    const autoSaveLogic = (num)=>{
        const number = num;
        setTimeout(()=>{
            if(number === autoSaveNum.current){
                if(title!==""||summary!==""||thumbnail!==""||text!==""){
                    autoSendApi();
                }
            }
        },3000)
    }

    const initPostApi = async(num)=>{   
        const data = new FormData();
        data.append("type","init");
        data.append("id",num);
        data.append("email",JSON.parse(sessionStorage.getItem("user_info")).email);
        //data.append("hash",JSON.parse(sessionStorage.getItem("user_info")).hash);
        data.append("blogName",JSON.parse(sessionStorage.getItem("user_info")).blogName);
        //data.append("category","");
        try{
            await axios(
            {
                method:"post",
                url:"/api/post/postModify",
                data
            }
            ).then((e)=>{
                console.log(e);
                if(e.data.code ==="0000"){
                    setTitle(e.data.data.title);
                    setSummary(e.data.data.summary);
                    setText(JSON.parse(e.data.data.mainText));
                    setIsLoading(true);
                }else{
                }
            })
        }catch{
        }
    }

    useEffect(()=>{
        // if(autoSaveState){
        //     window.removeEventListener('beforeunload', alertUser);
        //     window.removeEventListener('unload', alertUser);
        // }else{
        //     window.addEventListener('beforeunload', alertUser);
        //     window.addEventListener('unload', alertUser);
        // }
    },[autoSaveState])

    useEffect(()=>{
       setThumbnail(thumbnailLogic()?thumbnailLogic():"");
    },[text])

    useEffect(()=>{
        autoSaveNum.current++;
        if(autoSaveState){
            setAutoSaveState(false);
        }
        autoSaveLogic(autoSaveNum.current);
    },[title,summary,text])

    const alertUser = e => {
        e.preventDefault();
        e.returnValue = '';
    }

    return(
        <>
        {isLoading&&
            <div className='editorPage'>
                <div style={{width:"100%",height:"72px",marginBottom:"8px",display:"flex",justifyContent:"space-between",padding:"0px 48px",alignItems:"center"}}>
                <div className={autoSaveState?"autoSaveText--on":"autoSaveText--off"}>{autoSaveState?"저장완료":""}</div>
                    <div style={{display:"flex"}}>
                        <div className="editorBtn editorBtn--empty" style={{marginLeft:"16px"}} onClick={()=>{history.back();}}>취소</div>
                        <div className="editorBtn editorBtn--black" style={{marginLeft:"8px"}} onClick={autoSendApi}>임시저장하기</div>
                        <div className="editorBtn editorBtn--black" style={{marginLeft:"8px"}} onClick={endSendApi}>발행하기</div>
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
                    <EditorjsComponents 
                    setText={setText} text={text}/>
                </div>
            </div>}
        </>
    )
}

export default Editor;