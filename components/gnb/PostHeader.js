// @flow
import * as React from 'react';
import { useState,useEffect } from 'react';
import Link from 'next/link';

function PostHeader(props){
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
    },[])

    window.addEventListener("click",(e)=>{
        if(e.target.classList[0]==="loginBox__userProfileImg"){
        }else{
            setModalState(false);
        }
    })

    return(
        <div className='gnb gnb--post'>
            <div className='nav'>
                <Link href="/">
                    <a className="mainLogo"></a>
                </Link>
            </div>
            <div>
                <div className="loginBox">
                    {!loginState&&
                    <Link href="/login">
                        <a className="loginBox__signUpBtn">시작하기</a>
                    </Link>
                    }
                    {loginState&&
                    <Link href={`/${userState.blogName}`}>
                        <a className="loginBox__emptyBtn">내 블로그</a>
                    </Link>
                    }
                    {loginState&&
                    <Link href="/editor">
                        <a className="loginBox__emptyBtn">새 글쓰기</a>
                    </Link>
                    }
                    {loginState&&<div 
                    className="loginBox__userProfileImg" 
                    style={{backgroundImage:`url("https://proveit.cafe24.com${userState.profile_img}")`}}
                    onClick={()=>{setModalState(!modalState)}}
                    ></div>}
                </div>
            </div>
            {modalState&&<div className="modalWindow">
                dsdsd
                <Link href={`/${userState.blogName}`}>
                <a className="modalList">
                    <div className="modalListIcon modalIcon_myblog"></div>
                    <div>내 블로그</div>
                </a>
                </Link>
                <Link href={`/${userState.blogName}/admin`}>
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

export default PostHeader;