import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

function Login(){
  const [pwState,setPwState] =useState<boolean>(true);
  const [emailState,setEmailState] = useState<boolean>(true);
  const [pwView,setPwView] =useState<boolean>(false);
  const [loginInfo,setLoginInfo] = useState<any>({
    email:"",
    pw:""
  })

  
  function CheckEmail(str:any){                                                 
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!reg_email.test(str)) {                            
      return false;         
    }else {                       
      return true;         
    }                            
  }       

  const loginApi = async()=>{
    if(CheckEmail(loginInfo.email)){
      const data = new FormData();
      data.append("type","login");
      data.append("email",loginInfo.email);
      data.append("password",loginInfo.pw);
      try{
        await axios(
          {
            method:"post",
            url:"https://proveit.cafe24.com/api2/user.php",
            data
          }
        ).then((e:any)=>{
          if(e.data.ret_code ==="0000"){
            console.log(e);
            sessionStorage.setItem("user_info",JSON.stringify({
              hash:e.data.hash, 
              my_url:e.data.user.my_url, 
              profile_img:e.data.user.profile_img,
              email:e.data.user.email,
              nick_name:e.data.user.nick_name
            }));

            const a:any = document.createElement("a");
            a.href = sessionStorage.getItem("pre_url");
            a.click();
          }else{
          }
        })
      }catch{
      }
    }else{
      setEmailState(false);
    }
  }

  useEffect(()=>{
    window.addEventListener("keydown",(e:any)=>{
      if(e.key ==="Enter"){
        loginApi();
      }
    })
  },)

    return (
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Link href="/">
              <a style={{display:"flex",alignItems:"center",marginTop:"32px",zIndex:999}}>
                  <div className="mainLogo"></div>
                  <div className="mainLogoText"></div>
              </a>
          </Link>
          <div className="loginPageBg" style={{marginTop:"-32px"}}>
            <div className="loginPageBg_title">로그인</div>
            <div className="loginPageBg_sub">돌아오셨군요.</div>
          </div>
          <div style={{width:"100%",maxWidth:"596px",marginTop:"-58px",padding:"0px 18px"}}>
            <div className="inputPageTextBox">
              <div className="userInputPage">이메일주소</div>
              {!emailState&&<div className="errorMsg">올바른 이메일 형식이 아닙니다.</div>}
            </div>
            <input 
              className="inputBox" 
              type="text"
              value={loginInfo.email} 
              onChange={(e:any)=>{setLoginInfo({...loginInfo,email:e.target.value})}} 
              style={{marginBottom:"16px"}}
              ></input>
            <div className="inputPageTextBox">
            <div className="userInputPage">비밀번호*</div>
            {!pwState&&<div className="errorMsg">비밀번호 형식에 맞춰 입력해주세요.</div>}
            </div>
            <div style={{position:"relative",width:"100%"}}>
                <input 
                  className="inputBox" 
                  type={pwView?"text":"password"} 
                  value={loginInfo.pw} 
                  onChange={(e:any)=>{setLoginInfo({...loginInfo,pw:e.target.value})}} 
                  ></input>
                <div className={pwView?"pwdisplay_true":"pwdisplay_none"} onClick={()=>{setPwView(!pwView)}}></div>
            </div>
            <Link href="/findpw">
              <a className="infoText" style={{marginBottom:"20px",display:"block"}}>비밀번호가 기억나지 않습니까?</a>
            </Link>
            <div className="bigBtn" onClick={loginApi}>로그인</div>
            <div style={{width:"100%",textAlign:"center",color:"#323232",height:"32px",marginTop:"16px"}}>아직 회원이 아니신가요?<Link href="/signup"><a className="undelLineText">회원가입</a></Link></div>
          </div>
      </div>
    );
};

export default Login;