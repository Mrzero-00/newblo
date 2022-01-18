import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';


function Signup(){
  const [email,setEmail] = useState("");
  const [emailOverlap,setEmailOverlap] =useState(false);
  const [emailState,setEmailState] =useState(false);
  const [sendState,setSendState] = useState(false);
  const [signupState,setSignupState] = useState({
    email:"",
    pw:"",
    blogName:"",
    nickname:"",
    introText:""
  })
  function CheckEmail(str){                                                 
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!reg_email.test(str)) {                            
      return false;         
    }else {                       
      return true;         
    }                            
  }                       


  const onChangeText =(e)=>{
    const {name,value} = e.target;
    setSignupState({...signupState,[name]:value});
  }

  // const signupApi = async()=>{
  //   if(CheckEmail(email)){
  //     const data = new FormData();
  //     data.append("type","checkEmail");
  //     data.append("email",email);
  //     try{
  //       await axios(
  //         {
  //           method:"post",
  //           url:"https://proveit.cafe24.com/api2/user.php",
  //           data
  //         }
  //       ).then((e)=>{
  //         if(e.data.ret_code ==="0000"){
  //           setEmailOverlap(false);
  //           setSendState(true);
  //         }else{
  //           setEmailOverlap(true);
  //         }
  //       })
  //     }catch{
  //     }
  //   }else{
  //     setEmailState(true);
  //   }
  // }


    const signupApi = async()=>{
    if(CheckEmail(signupState.email)){
      const data = new FormData();
      data.append("type","checkEmail");
      data.append("email",signupState.email);
      data.append("pw",signupState.pw);
      data.append("nickname",signupState.nickname);
      data.append("blogName",signupState.blogName);
      data.append("introText",signupState.introText);
      try{
        await axios(
          {
            method:"post",
            headers:{'Content-Type': 'multipart/form-data'},
            url:"/api/user/signup",
            data
          }
        ).then((e)=>{
          if(e.data.code ==="0000"){
            sessionStorage.setItem("user_info",JSON.stringify({
              email:e.data.data.email,
              blogName:e.data.data.blogName, 
              nickname:e.data.data.nickname,
              introText:e.data.data.introText,
            }));
            const a = document.createElement("a");
            a.href = sessionStorage.getItem("pre_url");
            a.click();
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
    <div style={{display:"flex",width:"100%",minHeight:"100vh"}}>

    <div className='inputArea'>
        <Link href="/">
            <a className='inputArea__logo'>
                <div className="mainLogo"></div>
                <div className="mainLogoText"></div>
            </a>
        </Link>
        <div className='inputArea__goToSignUp'>
          이미 가입하셨나요?          
           <Link href="/login">
            <a className='inputArea__goToSignUp--alink'>
                로그인
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
            <div className='inputArea__input'>
              <div className='inputArea__label'>블로그 이름</div>
              <input type="text" name="blogName" className='inputArea__inputBox' onChange={onChangeText}></input>
            </div>
            <div className='inputArea__input'>
              <div className='inputArea__label'>닉네임</div>
              <input type="text" name="nickname" className='inputArea__inputBox' onChange={onChangeText}></input>
            </div>
            <div className='inputArea__input'>
              <div className='inputArea__label'>소개글</div>
              <input type="text" name="intro" className='inputArea__inputBox' onChange={onChangeText}></input>
            </div>
            <div type="submit" className='inputArea__Btn' onClick={()=>{signupApi()}}>가입하기</div>
        </div>
    </div>


    <div  className="imgArea__signup"style={{width:"60%",backgroundColor:"#000"}}>
    </div>

  </div>
      // <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
      //     <Link href="/">
      //         <a style={{display:"flex",alignItems:"center",marginTop:"32px",zIndex:999}}>
      //             <div className="mainLogo"></div>
      //             <div className="mainLogoText"></div>
      //         </a>
      //     </Link>
      //     <div className="signupPageBg" style={{marginTop:"-32px"}}>
      //     </div>
      //       <div className="signupPageBg_title">어서오세요!</div>
      //       <div className="signupPageBg_sub">
      //           뉴블로는 무슨무슨무슨 블로그입니다.<br/>
      //           여기서 어떤어떤어떤 일을 하고 글을 쓰세요!
      //       </div>
      //     <div style={{width:"100%",maxWidth:"596px",padding:"0px 18px"}}>
      //       <div className="inputPageTextBox">
      //         <div className="userInputPage">이메일 주소 인증</div>
      //         {emailState&&<div className="errorMsg">올바른 이메일 형식이 아닙니다.</div>}
      //         {emailOverlap&&<div className="errorMsg">이미 가입된 이메일 주소입니다.</div>}
      //       </div>
      //       <input className="inputBox" name="email" type="text" onChange={onChangeText} value={signupState.email} style={{marginBottom:"20px"}}></input>
      //       <input className="inputBox" name="pw" type="password" onChange={onChangeText} value={signupState.pw} style={{marginBottom:"20px"}}></input>
      //       <input className="inputBox" name="blogName" type="text" onChange={onChangeText} value={signupState.blogName} style={{marginBottom:"20px"}}></input>
      //       <input className="inputBox" name="nickname" type="text" onChange={onChangeText} value={signupState.nickname} style={{marginBottom:"20px"}}></input>
      //       <input className="inputBox" name="introText" type="text" onChange={onChangeText} value={signupState.introText} style={{marginBottom:"20px"}}></input>
      //       {!sendState&&<div className="bigBtn" onClick={signupApi}>인증메일 보내기</div>}
      //       {sendState&&<div className="bigBtn_onset">메일이 발송되었습니다.</div>}
      //       <div style={{width:"100%",textAlign:"center",color:"#323232",height:"32px",marginTop:"16px"}}>앗,이미 가입하셨나요?<Link href="/login"><a className="undelLineText">로그인</a></Link></div>
      //     </div>
      // </div>
    );
};

export default Signup;