// @flow
import * as React from 'react';
import {useState,useEffect,useRef} from "react";
import Link from 'next/link';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(()=>import("react-quill"),{ssr:false});
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
    const [objBtnState,setObjBtnState] = useState<boolean>(true);
    const [inputNum,setInputNum] = useState<any>(0);

    let textEditor:any;
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
        for(let i=0 ; i<textEditor.children.length; i++){
            for(let j=0 ; j<textEditor.children[i].children.length ; j++ ){
                if(textEditor.children[i].children[j].tagName==="IMG"){
                    //console.dir(textEditor.children[i].children[j].src);
                    return textEditor.children[i].children[j].src;
                }  
            }
        }
    }

    const handleChange_text=(e:any)=>{
        const objBtnList:any =document.querySelector(".objBtnList");
        let top:number = 0;
        textEditor = document.querySelector('.ql-editor');
        const addBtnCreate = document.createElement("LABEL");
        addBtnCreate.setAttribute("for","imgUpload");
        addBtnCreate.className = `objBtn objBtn_${textEditor.children.length}`;

        if(objBtnList!==null){
            for(let i=0 ; i<textEditor.children.length; i++){
                top+=textEditor.children[i].clientHeight;
                if(textEditor.children[i].innerText !=="\n"){
                    if(objBtnList.children[i+1]!==undefined){
                        objBtnList.children[i+1].style.display = "none";
                        objBtnList.children[i+1].style.top = `${top-32}px`;
                    }
                }else{
                    if(objBtnList.children[i+1]!==undefined){
                        objBtnList.children[i+1].style.display = "block";
                        objBtnList.children[i+1].style.top = `${top-32}px`;
                    }
                }
                
            }
        }
        setText(e);
        setThumbnail(thumbnailLogic());

        addBtnCreate.style.top = `${top-32}px`;
        if(objBtnList?.children.length-1 === textEditor.children.length){
            
        }else if(objBtnList?.children.length-1 >= textEditor.children.length){
            objBtnList?.removeChild(objBtnList.lastChild);
        }else{
            objBtnList?.appendChild(addBtnCreate);
        }
    }

    const imgSendApi = async(img:any)=>{
        const data = new FormData();
        data.append("img",img);
        data.append("email",JSON.parse(sessionStorage.getItem("user_info")!).email);
        data.append("hash",JSON.parse(sessionStorage.getItem("user_info")!).hash);
        data.append("type","imgUpload");
        try{
            await axios(
            {
                method:"post",
                url:"https://newblo.co.kr/api2/blog.php",
                data
            }
            ).then((e)=>{
                console.log(e);
            if(e.data.ret_code ==="0000"){
                addObj(e.data.img);
            }else{
            }
            })
        }catch{
        }
    }

    const FileUploder =(e:any) =>{
        e.preventDefault();
        let data = e.target;
        if(data.files[0].type === "image/jpeg" ||data.files[0].type ===  "image/png" ||data.files[0].type ===  "image/jpg"||data.files[0].type ===  "image/gif"){
            if (data.files) {
            for (let i = 0; i < data.files.length; i++) {
                let file = data.files[i];           
                    let fileSize = file.size;
                    fileSize *= 1;
                    if(fileSize <= 10000000){
                        imgSendApi(data.files[0]);
                    }else{
                        alert("파일 크기가 너무 큽니다.");
                    }
                }
                }
        }
        else{
            alert("해당 파일은 사용할 수 없습니다.");
        } 
        //input 내부 값 초기화
        e.target.value = "";
    }

    const addObj =(imgUrl:any)=>{
        textEditor = document.querySelector('.ql-editor');
        let frontContents: string ="";
        let backContents: string ="<p><br></p>";
        let middleContents: string =`<img src="https://newblo.co.kr${imgUrl}"></img>`;
        // outerHTML + {obj} + outerHTML
        for(let i=0; i<textEditor.children.length; i++){
            if(i<inputNum){
                frontContents+= textEditor.children[i].outerHTML;
            }else if(i>inputNum){
                backContents+= textEditor.children[i].outerHTML;
            }
        }
        // console.log("프론트 :",frontContents);
        // console.log('가운데 :',middleContents);
        // console.log("백 :",backContents);
        setText(frontContents+middleContents+backContents);
    }

    const addTooltip = (div:any) =>{
        const toolbar = div.children[0].children[0].children[2].children[2];
        for(let i=0; i<toolbar.children.length ; i++){
            for(let j=0;j<toolbar.children[i].children.length;j++){   
                if(toolbar.children[i].children[j].className === "ql-header"){
                    toolbar.children[i].children[j].setAttribute("title","부제목");
                }else if(toolbar.children[i].children[j].className === "ql-bold"){
                    toolbar.children[i].children[j].setAttribute("title","굵은 글씨");
                }else if(toolbar.children[i].children[j].className === "ql-italic"){
                    toolbar.children[i].children[j].setAttribute("title","기울인 글씨");
                }else if(toolbar.children[i].children[j].className === "ql-underline"){
                    toolbar.children[i].children[j].setAttribute("title","밑줄");
                }else if(toolbar.children[i].children[j].className === "ql-strike"){
                    toolbar.children[i].children[j].setAttribute("title","취소선");
                }else if(toolbar.children[i].children[j].className === "ql-blockquote"){
                    toolbar.children[i].children[j].setAttribute("title","인용글 넣기");
                }else if(toolbar.children[i].children[j].className === "ql-code-block"){
                    toolbar.children[i].children[j].setAttribute("title","코드 넣기");
                }else if(toolbar.children[i].children[j].className === "ql-align"){
                    if(toolbar.children[i].children[j].value ==="center"){
                        toolbar.children[i].children[j].setAttribute("title","중앙 정렬");
                    }else if(toolbar.children[i].children[j].value ==="right"){
                        toolbar.children[i].children[j].setAttribute("title","오른쪽 정렬");
                    }else{
                        toolbar.children[i].children[j].setAttribute("title","왼쪽 정렬");
                    }
                }else if(toolbar.children[i].children[j].className === "ql-list"){
                    if(toolbar.children[i].children[j].value ==="ordered"){
                        toolbar.children[i].children[j].setAttribute("title","숫자 리스트");
                    }else{
                        toolbar.children[i].children[j].setAttribute("title","점 리스트");
                    }
                }else if(toolbar.children[i].children[j].className === "ql-link"){
                    toolbar.children[i].children[j].setAttribute("title","링크 연결");
                }else if(toolbar.children[i].children[j].className === "ql-video"){
                    toolbar.children[i].children[j].setAttribute("title","영상 넣기");
                }else if(toolbar.children[i].children[j].className === "ql-clean"){
                    toolbar.children[i].children[j].setAttribute("title","서식 지우기");
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
        let editorOn:any;
        setTimeout(() => {
            editorOn = document.querySelector(".editorText");
        }, 0);
        setTimeout(() => {
            addTooltip(editorOn);
        }, 300);


    },[])

    const keyDownLogic =(e:any)=>{
        if(e.key === "Enter"){
        }
    }

    useEffect(()=>{
        textEditor = document.querySelector('.ql-editor');

        textEditor?.childNodes[0].addEventListener('change',()=>{console.log("야야")});
        // console.dir(textEditor?.childNodes[0]);

        for(let i =0 ; i<textEditor?.children.length ; i++){
            if(textEditor?.children[i].innerHTML==="<br>"){
                setObjBtnState(true);
                break;
            }else{
                setObjBtnState(false);
            }
        }
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
        data.append("maintext",text);
        data.append("category","");
        try{
            await axios(
            {
                method:"post",
                url:"https://newblo.co.kr/api2/blog.php",
                data
            }
            ).then((e)=>{
                console.log(e);
            if(e.data.ret_code ==="0000"){
                window.location.replace(`/${JSON.parse(sessionStorage.getItem("user_info")!).my_url}/${e.data.ret_data}`);
                // const alink = document.createElement("a");
                // alink.href = `/${JSON.parse(sessionStorage.getItem("user_info")!).my_url}/${e.data.ret_data}`;
                // alink.click();
            }else{
            }
            })
        }catch{
        }
    }
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
                <ReactQuill
                    theme={"bubble"}
                    onChange={handleChange_text}
                    onKeyDown={keyDownLogic}
                    value={text}
                    modules={{

                        toolbar:
                        [
                        [{'header': '2'}],
                        ['bold', 'italic', 'underline', 'strike',],
                        [ 'blockquote','code-block'],
                        [{ align: '' }, { align: 'center' }, { align: 'right' }],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        ['link', 'video'],
                        ['clean'],
                        
                        ],  

                      
                      clipboard: {
                        // toggle to add extra line breaks when pasting HTML:
                        matchVisual: false,
                      }}}
                    formats={[
                        'header', 'font', 'size',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'align','list', 'bullet','code-block',
                        'link', 'image', 'video',
                      ]}
                    bounds={'.editorBox'}
                    placeholder={"내용을 입력해주세요"}
                ></ReactQuill>

                <form className="objBtnList" onClick={(e:any)=>{
                    if(e.target.className!=="objBtnList" ){
                        setInputNum(e.target.className ? e.target.classList[1].substring(7)-1 : inputNum);
                    }
                    }}>
                    <input type='file' id="imgUpload" style={{display:"none"}}  accept=".jpg,.jpeg,.png,.bmp,.gif" onChange={FileUploder}></input>
                    <label htmlFor="imgUpload" className="objBtn objBtn_1"></label>
                </form>
            </div>
        </div>
    )
}

export default Editor;