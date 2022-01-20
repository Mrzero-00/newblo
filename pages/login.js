import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

function login(){
  const [pwState,setPwState] =useState(true);
  const [emailState,setEmailState] = useState(true);
  const [pwView,setPwView] =useState(false);
  const [loginInfo,setLoginInfo] = useState({
    email:"",
    pw:""
  })

  
  function CheckEmail(str){                                                 
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
      data.append("email",loginInfo.email);
      data.append("pw",loginInfo.pw);
      try{
        await axios(
          {
            method:"post",
            url:"/api/user/login",
            data
          }
        ).then((e)=>{
          console.log(e);
          if(e.data.code==="0000"){
            console.log(e.data);
            sessionStorage.setItem("user_info",JSON.stringify({
              // hash:e.data.hash, 
              email:e.data.data.email,
              blogName:e.data.data.blogName, 
              nickname:e.data.data.nickname,
              introText:e.data.data.introText,
            }));

            history.back();
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
    window.addEventListener("keydown",(e)=>{
      if(e.key ==="Enter"){
        loginApi();
      }
    })
  },)

  const onChangeText =(e)=>{
    const {name,value} = e.target;
    setLoginInfo({...loginInfo,[name]:value});
  }

    return (
      <div style={{display:"flex",width:"100%",minHeight:"100vh"}}>

        <div className='inputArea'>
            <Link href="/">
                <a className='inputArea__logo'>
                    <div className="mainLogo"></div>
                    <div className="mainLogoText"></div>
                </a>
            </Link>
            <div className='inputArea__goToSignUp'>
              처음 오셨나요?            
               <Link href="/signup">
                <a className='inputArea__goToSignUp--alink'>
                    가입하기
                </a>
            </Link>
            </div>
            <div style={{width:"100%",maxWidth:"336px",padding:"0px 8px"}}>
                <div className='inputArea__input'>
                  <div className='inputArea__label'>이메일 주소</div>
                  <input type="email" name="email" className='inputArea__inputBox' onChange={onChangeText}></input>
                </div>
                <div className='inputArea__input'>
                  <div className='inputArea__label'>비밀번호</div>
                  <input type="password" name="pw" className='inputArea__inputBox' onChange={onChangeText}></input>
                </div>
                <div type="submit" className='inputArea__Btn' onClick={()=>{loginApi()}}>로그인</div>
            </div>
        </div>


        <div  className="imgArea__login"style={{width:"60%",backgroundColor:"#000"}}>
        </div>

      </div>
    );
};

export default login;