import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';


function Signup(){
  const [email,setEmail] = useState<string>("");
  const [emailOverlap,setEmailOverlap] =useState<boolean>(false);
  const [emailState,setEmailState] =useState<boolean>(false);
  const [sendState,setSendState] = useState<boolean>(false);

  function CheckEmail(str:any){                                                 
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!reg_email.test(str)) {                            
      return false;         
    }else {                       
      return true;         
    }                            
  }                       


  const onChangeText =(e:any)=>{
    setEmailState(false);
    setEmail(e.target.value);
  }

  const signupApi = async()=>{
    if(CheckEmail(email)){
      const data = new FormData();
      data.append("type","checkEmail");
      data.append("email",email);
      try{
        await axios(
          {
            method:"post",
            url:"https://proveit.cafe24.com/api2/user.php",
            data
          }
        ).then((e)=>{
          if(e.data.ret_code ==="0000"){
            setEmailOverlap(false);
            setSendState(true);
          }else{
            setEmailOverlap(true);
          }
        })
      }catch{
      }
    }else{
      setEmailState(true);
    }
  }

    return (
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Link href="/">
              <a style={{display:"flex",alignItems:"center",marginTop:"32px",zIndex:999}}>
                  <div className="mainLogo"></div>
                  <div className="mainLogoText"></div>
              </a>
          </Link>
          <div className="signupPageBg" style={{marginTop:"-32px"}}>
          </div>
            <div className="signupPageBg_title">어서오세요!</div>
            <div className="signupPageBg_sub">
                뉴블로는 무슨무슨무슨 블로그입니다.<br/>
                여기서 어떤어떤어떤 일을 하고 글을 쓰세요!
            </div>
          <div style={{width:"100%",maxWidth:"596px",padding:"0px 18px"}}>
            <div className="inputPageTextBox">
              <div className="userInputPage">이메일 주소 인증</div>
              {emailState&&<div className="errorMsg">올바른 이메일 형식이 아닙니다.</div>}
              {emailOverlap&&<div className="errorMsg">이미 가입된 이메일 주소입니다.</div>}
            </div>
            <input className="inputBox" type="text" onChange={onChangeText} value={email} style={{marginBottom:"20px"}}></input>

            {!sendState&&<div className="bigBtn" onClick={signupApi}>인증메일 보내기</div>}
            {sendState&&<div className="bigBtn_onset">메일이 발송되었습니다.</div>}
            <div style={{width:"100%",textAlign:"center",color:"#323232",height:"32px",marginTop:"16px"}}>앗,이미 가입하셨나요?<Link href="/login"><a className="undelLineText">로그인</a></Link></div>
          </div>
      </div>
    );
};

export default Signup;