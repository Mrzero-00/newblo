import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';

function FindPw(){
    return (
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Link href="/">
              <a style={{display:"flex",alignItems:"center",marginTop:"32px",zIndex:999}}>
                  <div className="mainLogo"></div>
                  <div className="mainLogoText"></div>
              </a>
          </Link>
          <div className="pwPageBg" style={{marginTop:"-32px"}}>
          </div>
            <div className="pwPageBg_title">이런, 비밀번호를 잊으셨군요</div>
            <div className="pwPageBg_sub">
            괜찮습니다. 새로운 비밀번호를 만들기 위해 이메일을 입력해주세요.
            </div>
          <div style={{width:"100%",maxWidth:"596px",padding:"0px 18px"}}>
            <div className="inputPageTextBox">
              <div className="userInputPage">이메일 주소 인증</div>
              <div className="errorMsg">올바른 이메일 형식이 아닙니다.</div>
            </div>
            <input className="inputBox" type="text" style={{marginBottom:"20px"}}></input>

            <div className="bigBtn">인증메일 보내기</div>
            <div style={{width:"100%",textAlign:"center",color:"#323232",height:"32px",marginTop:"24px",cursor:"pointer",lineHeight:"32px"}} onClick={()=>{window.history.back()}}>돌아가기</div>
          </div>
      </div>
    );
};

export default FindPw;