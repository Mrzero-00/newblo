import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

function SignupInfo(){
    const [agree,setAgree] = useState<boolean>(false);
    const [sendState,setSendState] = useState<boolean>(false);
    const [pwState,setPwState] = useState<boolean>(true);
    const [nicknameState,setNicknameState] = useState<boolean>(true);
    const [blogState,setBlogState] = useState<boolean>(true);
    const [currentImg,setCurrentImg] = useState<any>("");
    const [adminState,setadminState] = useState<boolean>(false);
    const [blogOverLapState,setBlogOverlapState] = useState<boolean>(false);
    const [pwView,setPwView] =useState<boolean>(false);
    const [userInfo,setUserInfo] =useState<any>({
        profile_img:"",
        email:'',
        password:"",
        nick_name:"",
        my_url:"",
        summary:"",
        marketing_use:false
    })


    const signupInfoApi = async()=>{
        if(nicknameCheck(userInfo.nick_name)&&blogCheck(userInfo.my_url)&&passworldCheck(userInfo.password)){
            const data = new FormData();
            data.append("type","join");
            data.append("profile_img",userInfo.profile_img);
            data.append("email",userInfo.email);
            data.append("password",userInfo.password);
            data.append("nick_name",userInfo.nick_name);
            data.append("my_url",userInfo.my_url);
            data.append("summary",userInfo.summary);
            data.append("marketing_use",userInfo.marketing_use);
            try{
              await axios(
                {
                  method:"post",
                  url:"https://proveit.cafe24.com/api2/user.php",
                  data
                }
              ).then((e)=>{
                if(e.data.ret_code ==="0000"){
                    const alink =document.createElement("a");
                    alink.href = '/login';
                    alink.click();
                }else{
                  console.log(e);
                  setBlogOverlapState(true);
                }
              })
            }catch{
            }
        }else{
            if(!nicknameCheck(userInfo.nick_name)){
                setNicknameState(false);
            }
            if(!blogCheck(userInfo.my_url)){
                setBlogState(false);
            }
            if(!passworldCheck(userInfo.passworld)){
                setPwState(false);
            }
        }
    }
    

    const FileUploder =(e:any) =>{
        e.preventDefault();
        let data = e.target;
        if(data.files[0].type === "image/jpeg" ||data.files[0].type ===  "image/png" ||data.files[0].type ===  "image/jpg"||data.files[0].type ===  "image/gif"){
            if (data.files) {
            for (let i = 0; i < data.files.length; i++) {
                let file = data.files[i];           
                    let fileSize = file.size;
                    fileSize *= 1;
                    if(fileSize <= 10000000){
                        setCurrentImg(window.URL.createObjectURL(file));
                        setUserInfo({...userInfo,profile_img:data.files[0]});
                    }else{
                        alert("파일 크기가 너무 큽니다.");
                    }
                }
                }
        }
        else{
            alert("해당 파일은 사용할 수 없습니다.");
        } 
        //input 내부 값 초기화
        e.target.value = "";
    }
    

    const changeText =(e:any)=>{
        const {name,value} = e.target;
        setUserInfo({...userInfo,[name]:value});
    }

    const removeImg=()=>{
        setCurrentImg("");
        setUserInfo({...userInfo,profile_img:""});
    }

    const passworldCheck =(str:string)=>{
        var pattern_num = /[0-9]/;	// 숫자
        var pattern_text = /[a-z]/;	// 영문 
    	var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
        if(str===undefined){

        }else{
            if(str.length <8){
                return false;    
            }else{
                if(pattern_text.test(str)&&pattern_spc.test(str)){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

    const blogCheck =(str:string)=>{
        var pattern_num = /[0-9]/;	// 숫자
        var pattern_text = /[a-z]/;	// 영문 
        var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    	var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
        if(str.length >=4){
            if(pattern_spc.test(str)&&pattern_kor.test(str)){
                return false;
            }else{
                return true;
            }
        }
    }

    const nicknameCheck =(str:string)=>{
        var pattern_num = /[0-9]/;	// 숫자
        var pattern_text = /[a-z]/;	// 영문 
        var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
    	var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
        if(cal_msg_length(str) >=4){
            if(pattern_spc.test(str)){
                return false;
            }else{
                return true;
            }
        }
    }

    function cal_msg_length(msg:any) {
        var nbytes = 0;
        for (let i=0; i<msg.length; i++) {
            var ch = msg.charAt(i);
            if(escape(ch).length > 4) {
                nbytes += 2;
            } else if (ch == '\n') {
                if (msg.charAt(i-1) != '\r') {
                    nbytes += 1;
                }
            } else if (ch == '<' || ch == '>') {
                nbytes += 4;
            } else {
                nbytes += 1;
            }
        }
        return nbytes;
    }

    useEffect(()=>{
            const data = new FormData();
            data.append("type","returnEmail");
            data.append("hash",window.location.pathname.substring(6));
            try{
                axios(
                {
                  method:"post",
                  url:"https://proveit.cafe24.com/api2/user.php",
                  data
                }
              ).then((e)=>{
                if(e.data.ret_code ==="0000"){
                    setUserInfo({...userInfo,email:e.data.email});
                }else{
                }
              })
            }catch{
            }
    },[])


    return (
      <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Link href="/">
              <a className="mainLogo loginPageLogo"></a>
        </Link>
        <div className="signupInfoPageBg_title">추가정보를 입력해 주세요.</div>

        <div style={{width:"100%",maxWidth:"560px"}}>

        <div className="inputPageTextBox">
            <div className="userInputPage">프로필 이미지</div>
        </div>
        <div className="profileImgBox" style={{marginBottom:'16px'}}>
            <div className={userInfo.profile_img===""?"defalut_profileimg":"profileImgBox_img"} style={{backgroundImage:userInfo.profile_img!==""?`url(${currentImg})`:""}}></div>
            <div className="profileImgBox_btnbox">
                <div className="profileImgBox_btnbox_btnbox">
                    <form style={{display:"block"}}>
                        <input type='file' id="thumbnailImg" style={{display:"none"}}  accept=".jpg,.jpeg,.png,.bmp" onChange={FileUploder}></input>
                        <label htmlFor="thumbnailImg" className="emptyRecBtn" style={{marginRight:"8px"}}>이미지 업로드
                        </label>
                    </form>
                    <div className="emptyRecBtn" onClick={removeImg}>삭제</div>
                </div>
                <div className="profileImgBox_btnbox_text">120*120px, jpg, jpeg, png, gif, 2MB 이하</div>
            </div>
        </div>

        <div className="inputPageTextBox">
            <div className="userInputPage">이메일 주소</div>
        </div>
        <div className="user_adminPage_userInfoPage_email" style={{marginBottom:"20px"}}>
            {userInfo.email}
            <div className="user_adminPage_userInfoPage_email_lockIcon"></div>
        </div>

        <div className="inputPageTextBox">
            <div className="userInputPage">비밀번호*</div>
            {!pwState&&<div className="errorMsg">비밀번호 형식에 맞춰 입력해주세요.</div>}
        </div>
        <div style={{position:"relative",width:"100%"}}>
            <input className="inputBox" type={pwView?"text":"password"} name="password" onChange={changeText}></input>
            <div className={pwView?"pwdisplay_true":"pwdisplay_none"} onClick={()=>{setPwView(!pwView)}}></div>
        </div>
        <div className="infoText" style={{marginBottom:"20px",display:"block"}}>8자 이상의 영문과 특수문자 조합</div>
        
        <div className="inputPageTextBox">
            <div className="userInputPage">블로그 주소*</div>
            {!blogState&&<div className="errorMsg">블로그 주소 형식에 맞춰 입력해주세요.</div>}
            {blogOverLapState&&<div className="errorMsg">이미 존재하는 주소입니다.</div>}
        </div>
        <div style={{position:"relative",width:"100%"}}>
            <input className="inputBox" type="text"  name="my_url" onChange={changeText}></input>
        </div>
        <div className="infoText" style={{marginBottom:"20px",display:"block"}}>영문 및 숫자 최소 4자 이상, <span style={{color:"#FF6666"}}>가입 이후 변경 불가</span></div>

        <div className="inputPageTextBox">
            <div className="userInputPage">닉네임*</div>
            {!nicknameState&&<div className="errorMsg">닉네임 형식에 맞춰 입력해주세요.</div>}
        </div>
        <input className="inputBox" type="text" name="nick_name" onChange={changeText}></input>
        <div className="infoText" style={{marginBottom:"20px",display:"block"}}>2글자 이상의 한글 또는 4글자 이상의 영문 및 숫자</div>

        <div className="inputPageTextBox">
            <div className="userInputPage">한 줄 소개</div>
        </div>
        <input className="inputBox" type="text" name="summary" onChange={changeText}></input>
        <div className="infoText" style={{marginBottom:"20px",display:"block"}}>140자 이내</div>

        <div className="checkbox_box" style={{marginBottom:"12px"}}>
            <div className={userInfo.marketing_use?"checkbox_true":"checkbox_false"} onClick={()=>{setUserInfo({...userInfo,marketing_use:!userInfo.marketing_use});}}></div>
            <div>마케팅 수신 동의(선택)</div>
        </div>

        <div className="checkbox_box" style={{marginBottom:"28px"}}>
            <div className={agree?"checkbox_true":"checkbox_false"} onClick={()=>{setAgree(!agree);}}></div>
            <div>
                이용약관 
                및 
                개인정보처리방침 
                동의(필수)</div>
        </div>


        {(userInfo.password!==""&&userInfo.nick_name!==""&&userInfo.my_url!==""&&agree)&&<div className="bigBtn" onClick={signupInfoApi}>가입하기</div>}
        {!(userInfo.password!==""&&userInfo.nick_name!==""&&userInfo.my_url!==""&&agree)&&<div className="bigBtn_Disabled">가입하기</div>}
        </div>
      </div>
    );
};

export default SignupInfo;