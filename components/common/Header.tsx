// @flow
import * as React from 'react';
import { useState,useEffect } from 'react';
import Link from 'next/link';
type Props = {
  
};
type State = {
  
};

function Header(){
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
        location.reload();
    }

    useEffect(()=>{
        sessionStorage.setItem("pre_url",window.location.pathname);
        if(sessionStorage.getItem("user_info")!==null){
            setLoginState(true);
            setUserState(JSON.parse(sessionStorage.getItem("user_info")!));
        }
    },[])

    window.addEventListener("click",(e:any)=>{
        if(e.target.classList[0]==="headerMyProfile"){
            setModalState(!modalState);
        }else{
            setModalState(false);
        }
    })
    return(
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
            <div style={{width:"100%",maxWidth:"1560px",display:"flex",justifyContent:"space-between",alignItems:"center",height:"64px",padding:"0px 20px",position:"relative"}}>
                <div className="logoBox">
                    <Link href="/">
                        <a style={{display:"flex",alignItems:"center"}}>
                            <div className="mainLogo"></div>
                            <div className="mainLogoText"></div>
                        </a>
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
                            <a className="emptyBtn">새 글쓰기</a>
                        </Link>
                        }
                        {loginState&&<div className="headerMyProfile" style={{backgroundImage:`url("https://proveit.cafe24.com${userState.profile_img}")`}}></div>}
                    </div>
                </div>
                {modalState&&<div className="modalWindow">
                    <Link href={`/${userState.my_url}`}>
                    <a className="modalList">
                        <div className="modalListIcon modalIcon_myblog"></div>
                        <div>내 블로그</div>
                    </a>
                    </Link>
                    <Link href={`/${userState.my_url}/admin`}>
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

        </div>
    )
}

export default Header;