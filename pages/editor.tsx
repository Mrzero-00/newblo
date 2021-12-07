// @flow
import * as React from 'react';
import {useState,useEffect,useRef} from "react";
import Link from 'next/link';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(()=>import("react-quill"),{ssr:false});
const EditorjsComponents = dynamic(()=>import("../components/editor/EditorjsComponents"),{ssr:false});
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';



function Editor(){
    const [title,setTitle] = useState<string>("");
    const [summary,setSummary] = useState<string>("");
    const [text,setText] = useState<string>("");
    const [thumbnail,setThumbnail] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [titleEnter,setTitleEnter] =useState<boolean>(false);
    const [summaryEnter,setSummaryEnter] =useState<boolean>(false);
    const [prePage,setPrePage] =useState<string>("");

    const handleChange_title=(e:any)=>{
        if(!titleEnter){
            setTitle(e.target.value);
        }
    }

    const handleChange_summary=(e:any)=>{
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
                        return editorBox?.children[i].children[0].children[0].children[0].children[1].currentSrc;
                    }
                   // setThumbnail()
                }
            }
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        if(sessionStorage.getItem("user_info")){

        }else{
            const alink = document.createElement("a");
            alink.href="/";
            alink.click();    
        }
        setPrePage(sessionStorage.getItem('pre_url')!);
    },[])

    useEffect(()=>{
        setThumbnail(thumbnailLogic());
    },[text])

    const writeSendApi = async()=>{   
        const data = new FormData();
        data.append("type","createBlog");
        data.append("email",JSON.parse(sessionStorage.getItem("user_info")!).email);
        data.append("hash",JSON.parse(sessionStorage.getItem("user_info")!).hash);
        data.append("my_url",JSON.parse(sessionStorage.getItem("user_info")!).my_url);
        data.append("thumbnail",thumbnail);
        data.append("title",title);
        data.append("summary",summary);
        data.append("maintext",JSON.stringify(text));
        data.append("category","");
        try{
            await axios(
            {
                method:"post",
                url:"https://proveit.cafe24.com/api2/blog.php",
                data
            }
            ).then((e)=>{
                console.log(e);
            if(e.data.ret_code ==="0000"){
                window.location.replace(`/${JSON.parse(sessionStorage.getItem("user_info")!).my_url}/${e.data.ret_data}`);
                const alink = document.createElement("a");
                alink.href = `/${JSON.parse(sessionStorage.getItem("user_info")!).my_url}/${e.data.ret_data}`;
                alink.click();
            }else{
            }
            })
        }catch{
        }
    }
    console.log(thumbnail);
    return(
        <div>
            <div style={{width:"100%",height:"72px",marginBottom:"8px",display:"flex",justifyContent:"space-between",padding:"0px 48px",alignItems:"center"}}>
                <div>{""}</div>
                <div style={{display:"flex"}}>
                    <div></div>
                    <Link href={prePage}>
                        <div className="emptyBtn" style={{marginLeft:"16px"}}>취소</div>
                    </Link>
                    <div className="nomalBtn" style={{marginLeft:"8px"}} onClick={writeSendApi}>발행하기</div>
                </div>
            </div>
            <div className="editorTitle">
                <TextareaAutosize onChange={(e:any)=>{handleChange_title(e)}} value={title} onKeyDown={(e:any)=>{if(e.keyCode===13){setTitleEnter(true)}else{setTitleEnter(false)}}} placeholder="제목을 입력하세요"></TextareaAutosize>
            </div>
            <div className="editorSummary">
            <TextareaAutosize onChange={(e:any)=>{handleChange_summary(e)}} value={summary} onKeyDown={(e:any)=>{if(e.keyCode===13){setSummaryEnter(true)}else{setSummaryEnter(false)}}} placeholder="요약글을 작성해주세요"></TextareaAutosize>
            </div>
            <div className="editorText">
      
                <EditorjsComponents setText={setText} text={text}/>
            </div>
        </div>
    )
}

export default Editor;