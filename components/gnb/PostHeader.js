// @flow
import * as React from 'react';
import { useState,useEffect,useRef } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

function PostHeader(props){
    
    const router = useRouter();
    const copyUrl =useRef("");
    const [loginState,setLoginState] = useState(false);
    const [modalState,setModalState] = useState(false);
    const [linkAlretState,setLinkAlretState]  =useState(false);
    const [shareModalState,setShareModalState] = useState(false);
    const [userState,setUserState] = useState({
        email: "mrprins90@naver.com",
        hash: "",
        my_url: "hihi",
        nick_name: "프덜트",
        profile_img: ""
    });

    const logoutLogic =()=>{
        sessionStorage.removeItem("user_info");
        setLoginState(false);
        setModalState(false);
        location.reload();
    }

    useEffect(()=>{
        sessionStorage.setItem("pre_url",window.location.pathname);
        if(sessionStorage.getItem("user_info")!==null){
            setLoginState(true);
            setUserState(JSON.parse(sessionStorage.getItem("user_info")));
        }
        window.addEventListener("click",clickHandle);
    },[])

    const clickHandle = (e)=>{
        const classname = e.target.classList[0];
        if(classname==="loginBox__userProfileImg"){
            setShareModalState(false);
        }else if(classname ==="gnb__postIconList_shareIcon"){
            setModalState(false);
        }else{
            setShareModalState(false);
            setModalState(false);
        }
    }

    const shareLogic_url =()=>{
        copyUrl.current.focus();
        copyUrl.current.select();
        copyToClipboard(copyUrl.current.value).then(()=>{
            setLinkAlretState(true);
        })
      }

      function copyToClipboard(textToCopy) {
        // navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            return navigator.clipboard.writeText(textToCopy);
        } else {
            // text area method
            let textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            // make the textarea out of viewport
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                // here the magic happens
                document.execCommand('copy') ? res() : rej();
                textArea.remove();
            });
        }
    }

    
    useEffect(()=>{
        if(linkAlretState){
            setTimeout(() => {
                setLinkAlretState(false);
            }, 3000);
        }
    },[linkAlretState])

    return(
        <>
            <div className='gnb gnb--post'>
                <div className='nav'>
                    <Link href="/">
                        <a className="mainLogo"></a>
                    </Link>
                </div>
                <div>
                    <div className="loginBox">
                        <div className='gnb__postIconList'>
                            <div className='gnb__postIconList_likeIcon'></div>
                            <div className='gnb__postIconList_likeCounter'></div>
                            <div className='gnb__postIconList_replyIcon'></div>
                            <div className='gnb__postIconList_replyCounter'></div>
                            <div className='gnb__postIconList_shareIcon'  onClick={()=>{setShareModalState(!shareModalState)}}></div>
                        </div>
                        {!loginState&&
                        <Link href="/login">
                            <a className="loginBox__signUpBtn">로그인</a>
                        </Link>
                        }
                        {loginState&&<div 
                        className="loginBox__userProfileImg" 
                        // style={{backgroundImage:`url("https://proveit.cafe24.com${userState.profile_img}")`}}
                        onClick={()=>{setModalState(!modalState)}}
                        ></div>}
                    </div>
                </div>
            </div>
            {shareModalState&&<div className='gnb__shareMenu'>
                <div className='gnb__shareIcon gnb__shareIcon--facebook'></div>
                <div className='gnb__shareIcon gnb__shareIcon--twitter'></div>
                <div className='gnb__shareIcon gnb__shareIcon--kakao'></div>
                <div className='gnb__shareIcon gnb__shareIcon--link' onClick={shareLogic_url}></div>
            </div>
            }
            {modalState&&<div className="modalWindow">
                <Link href={`/${userState.blogName}`}>
                <a className="modalList">
                    <div className="modalListIcon modalIcon_myblog"></div>
                    <div>내 블로그</div>
                </a>
                </Link>
                <Link href={`/editor`}>
                <a className="modalList">
                    <div className="modalListIcon modalIcon_editor"></div>
                    <div>새 글쓰기</div>
                </a>
                </Link>
                <Link href={`/draftList`}>
                <a className="modalList">
                    <div className="modalListIcon modalIcon_draft"></div>
                    <div>임시 저장 글</div>
                </a>
                </Link>
                <Link href={`/draftList`}>
                <a className="modalList">
                    <div className="modalListIcon modalIcon_setting"></div>
                    <div>관리자</div>
                </a>
                </Link>
                <div className="modalList" onClick={logoutLogic}>
                    <div className="modalListIcon modalIcon_logout"></div>
                    <div>로그아웃</div>
                </div>
            </div>}

            {linkAlretState&&<div className='toast__linkCopy'>
                <div className='toast__text'>링크가 복사되었습니다.</div>
                <div className='toast__cancelIcon' onClick={()=>{setLinkAlretState(false)}}></div>
            </div>}
            <textarea style={{display:"none"}} ref={copyUrl} value={`https://www.newblo.co.kr/${router.query.name}/${router.query.id}`}></textarea>
        </>
        
    )
}

export default PostHeader;