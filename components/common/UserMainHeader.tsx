// @flow
import * as React from 'react';
import { useState,useEffect } from 'react';
import Link from 'next/link';

interface objectDefalut {
    email: string;
    hash: string;
    my_url:string;
    nick_name:string;
    profile_img:string;
}

function UserMainHeader(props:any){
    const [renderState,setRenderState] = useState<boolean>(false);
    const [loginState,setLoginState] = useState<boolean>(false);
    const [modalState,setModalState] = useState<boolean>(false);
    const [userState,setUserState] = useState<any>({
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
    }

    const clickEvt = ()=>{
        setModalState(false);
    }

    useEffect(()=>{
        setModalState(false);
        sessionStorage.setItem("pre_url",window.location.pathname);
        if(sessionStorage.getItem("user_info")!==null){
            setLoginState(true);
        }
        setUserState(JSON.parse(sessionStorage.getItem("user_info")!) as objectDefalut);
        setRenderState(true);
    },[])

    window.addEventListener("click",(e:any)=>{
        if(e.target.classList[0]==="headerMyProfile"){
            setModalState(!modalState);
        }else{
            setModalState(false);
        }
    })

    return(
        <>
           {renderState&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 48px",height:"72px",width:"100%"}}>
                <div className="logoBox" style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <Link href={`/${props.userUrl}`}>
                        {/* {props.blog_name ===""?<a className="userLogo">{`${props.nick_name}`}의 블로그</a> : <a className="userLogo">{props.blog_name}</a>} */}
                        <a className="userLogo">{`${props.nick_name}`}의 블로그</a>
                    </Link>
                </div>
                <div>
                    <div className="loginBox">
                        {/* <div  onClick={()=>{console.log(window.location)}}>dd</div> */}
                        {!loginState&&
                        <Link href="/login">
                            <a className="nomalBtn">로그인</a>
                        </Link>
                        }
                        {loginState&&
                        <Link href="/editor">
                            <a className="greenBtn">새 글쓰기</a>
                        </Link>
                        }
                        {loginState&&<div className="headerMyProfile" style={{backgroundImage:`url("https://proveit.cafe24.com${userState.profile_img}")`}}></div>}
                        <Link href="/">
                            <a className="mainLogo" style={{marginLeft:"20px"}}></a>
                        </Link>
                    </div>
                </div>
                {modalState&&<div className="modalWindow">
                    <Link href={`/${userState.my_url}`}>
                    <a className="modalList" onClick={clickEvt}>
                        <div className="modalListIcon modalIcon_myblog"></div>
                        <div>내 블로그</div>
                    </a>
                    </Link>
                    <Link href={`/${userState.my_url}/admin`}>
                    <a className="modalList" onClick={clickEvt}>
                        <div className="modalListIcon modalIcon_setting"></div>
                        <div>관리자</div>
                    </a>
                    </Link>
                    <div className="modalList" onClick={logoutLogic}>
                        <div className="modalListIcon modalIcon_logout"></div>
                        <div>로그아웃</div>
                    </div>
                </div>}
            </div>}
        </>
    )
}

export default UserMainHeader;