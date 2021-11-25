import axios from 'axios';
import * as React from 'react';
import { useState ,useEffect } from 'react';


function UserInfo({userInfomation}:{userInfomation:any}){
    const [userInfo,setUserInfo] = useState<any>({
        email: "mrprins90@naver.com",
        hash: "",
        marketing_use: false,
        nick_name: "ㅇㅇㅇㅇ",
        summary: "",
        profile_img:"",
    });

    const [changeInfo,setChangeInfo] = useState<any>({
        email: "mrprins90@naver.com",
        hash: "",
        marketing_use: false,
        nick_name: "ㅇㅇㅇㅇ",
        summary: ""
    })

    const [changeState_nickName,setChangeState_nickName] = useState<boolean>(false);
    const [changeState_summary,setChangeState_summary] = useState<boolean>(false);
    const [currentImg,setCurrentImg] = useState<any>("");
    const [nicknameState,setNicknameState] = useState<boolean>(true);
    
    const changeLogic = (e:any)=>{
        setChangeInfo({
            ...changeInfo,[e.target.name]:e.target.value
        })
    }

    const cancelLogic = (e:any)=>{
        if(e.target.name === "nick_name"){
            setChangeInfo({...changeInfo,nick_name:userInfo.nick_name});
            setChangeState_nickName(false);
        }else{
            setChangeInfo({...changeInfo,summary:userInfo.summary});
            setChangeState_summary(false);
        }
    }

    const signupInfoApi = async(click:any)=>{
        if(nicknameCheck(userInfo.nick_name)){
            const data = new FormData();
            data.append("type","modifyinfo");
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
              ).then((e:any)=>{
                if(e.data.ret_code ==="0000"){

                    if(click.target.name ==="nick_name"){
                        setUserInfo(changeInfo);
                        setChangeState_nickName(false);
                    }else if(click.target.name ==="summary"){
                        setUserInfo(changeInfo);
                        setChangeState_summary(false);
                    }else{
                        if(click.target.value==="true"){
                            setUserInfo({...userInfo,marketing_use:true});
                        }else{
                            setUserInfo({...userInfo,marketing_use:false});
                        }
                    }
                    
                }else{
                  console.log(e);
                }
              })
            }catch{
            }
        }else{
            if(!nicknameCheck(userInfo.nick_name)){
                setNicknameState(false);
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
    
    const removeImg=()=>{
        setCurrentImg("");
        setUserInfo({...userInfo,profile_img:""});
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
        setUserInfo(userInfomation);
        setChangeInfo(userInfomation);
    },[])
    console.log(userInfo);
    
    return (
      <div style={{width:"100%",display:"flex",flexDirection:"column"}}>

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
                <div className="email_not_change">이메일 주소는 변경할 수 없습니다.</div>
            </div>
            <div className="user_adminPage_userInfoPage_email" style={{marginBottom:"20px"}}>
                {userInfo.email}
                <div className="user_adminPage_userInfoPage_email_lockIcon"></div>
            </div>

            <div className="inputPageTextBox" style={{paddingBottom:"24px",borderBottom:"1px solid #dcdcdc",marginBottom:"20px"}}>
                <div className="userInputPage">비밀번호*</div>
                <div className="user_adminPage_userInfoPage_btn">변경</div>
            </div>
            
            <div className="inputPageTextBox">
                <div className="userInputPage">닉네임*</div>
                {!changeState_nickName?<div className="user_adminPage_userInfoPage_btn" onClick={()=>{setChangeState_nickName(true);}}>변경</div>
                :<div style={{display:"flex",alignItems:"center"}}>
                    <button className="user_adminPage_userInfoPage_savebtn" name="nick_name" onClick={signupInfoApi}>저장</button>
                    <button className="user_adminPage_userInfoPage_btn" name="nick_name" onClick={cancelLogic}>취소</button>
                </div>}
            </div>
            {changeState_nickName?
            <input className="inputBox" type="text" name="nick_name" value={changeInfo.nick_name} onChange={changeLogic}></input>
            :
            <div className="inputDisabled">{userInfo.nick_name}</div>}
            <div className="infoText" style={{marginBottom:"20px",display:"block"}}>2글자 이상의 한글 또는 4글자 이상의 영문 및 숫자</div>

            <div className="inputPageTextBox">
                <div className="userInputPage">한 줄 소개</div>
                {!changeState_summary?<div className="user_adminPage_userInfoPage_btn" onClick={()=>{setChangeState_summary(true);}}>변경</div>
                :<div style={{display:"flex",alignItems:"center"}}>
                    <button className="user_adminPage_userInfoPage_savebtn" name="summary" onClick={signupInfoApi}>저장</button>
                    <button className="user_adminPage_userInfoPage_btn" name="summary" onClick={cancelLogic}>취소</button>
                </div>}
            </div>

            {changeState_summary?
            <input className="inputBox" type="text" name="summary" value={changeInfo.summary} onChange={changeLogic}></input>
            :
            <div className="inputDisabled">{userInfo.summary}</div>}
            <div className="infoText" style={{paddingBottom:"20px",display:"block",borderBottom:"1px solid #dcdcdc"}}>140자 이내</div>
            
            <div className="userInputPage" style={{marginTop:"20px",marginBottom:"20px"}}>뉴스레터 수신(선택)</div>
            <div style={{display:"flex",alignItems:"center"}}>
                <div className="marketing_box">
                    <button className={userInfo.marketing_use?"radio_on":"radio_off"} name="marketing_use" value="true" onClick={signupInfoApi}></button>
                    <div>예</div>
                </div>

                <div className="marketing_box">
                    <button className={!userInfo.marketing_use?"radio_on":"radio_off"} name="marketing_use" value="false" onClick={signupInfoApi}></button>
                    <div>아니오</div>
                </div>
            </div>
        
        </div>

      </div>
    );
};

export default UserInfo;