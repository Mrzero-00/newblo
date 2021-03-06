// @flow
import * as React from 'react';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
function UserHeader(props){
    const router = useRouter();
    const [loginState,setLoginState] = useState(false);
    const [modalState,setModalState] = useState(false);
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
        if(e.target.classList[0]==="loginBox__userProfileImg"){
        }else{
            setModalState(false);
        }
    }

    return(
        <div className='gnb'>
            <div className="logoBox" style={{display:"flex",alignItems:"center"}}>
                {/* <Link href="/">
                        <a className="mainLogo" style={{marginRight:"8px"}}></a>
                </Link> */}
                <Link href={`/${props.userUrl}`}>
                    <a className="userLogo">{`${props.nick_name}`}의 블로그</a>
                </Link>
            </div>
            <div className="loginBox">
                <Link href="/">
                    <a className="loginBox__emptyBtn">블로그 홈</a>
                </Link>
                {!loginState&&
                <Link href="/login">
                    <a className="loginBox__emptyBtn">로그인</a>
                </Link>
                }
                {loginState&&
                <Link href="/editor">
                    <a className="loginBox__emptyBtn">새 글쓰기</a>
                </Link>
                }
                {loginState&&<div 
                className="loginBox__userProfileImg" 
                // style={{backgroundImage:`url("https://proveit.cafe24.com${userState.profile_img}")`}}
                onClick={()=>{setModalState(!modalState)}}
                ></div>}
            </div>
            {modalState&&<div className="modalWindow">
                {/* <Link href={`/${userState.blogName}`}> */}
                <div className="modalList" onClick={()=>{router.push(`/${userState.blogName}`)}}>
                    <div className="modalListIcon modalIcon_myblog"></div>
                    <div>내 블로그</div>
                </div>
                {/* </Link> */}
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
        </div>
        
    )
}

export default UserHeader;