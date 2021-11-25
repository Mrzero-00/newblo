import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';

function PwReset(){
    return (
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Link href="/">
              <a className="mainLogo loginPageLogo"></a>
          </Link>
          <div className="loginPageBg">
            <div className="loginPageBg_title">비밀번호 변경</div>
            <div className="loginPageBg_sub">새로운 비밀번호를 입력해주세요.</div>
          </div>
          <div style={{width:"100%",maxWidth:"560px",marginTop:"-58px"}}>
            <div className="inputPageTextBox">
              <div className="userInputPage">이메일주소</div>
            </div>
            <input className="inputBox" type="text" style={{marginBottom:"16px"}}></input>
            <div className="inputPageTextBox">
              <div className="userInputPage">새로운 비밀번호</div>
              <div className="errorMsg">새로운 비밀번호를 입력해주세요</div>
            </div>
            <input className="inputBox" type="password"></input>
            <Link href="/findpw">
              <a className="infoText" style={{marginBottom:"20px",display:"block"}}>8자 이상의 영문과 특수문자 조합</a>
            </Link>
            <div className="bigBtn">변경된 비밀번호로 로그인</div>
          </div>
      </div>
    );
};

export default PwReset;