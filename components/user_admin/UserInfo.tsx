import * as React from 'react';
import { useState ,useEffect } from 'react';


function UserInfo({userInfomation}:{userInfomation:any}){
    const [userInfo,setUserInfo] = useState<any>({
        email: "mrprins90@naver.com",
        hash: "",
        marketing_use: false,
        nick_name: "ㅇㅇㅇㅇ",
        summary: ""
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

    const sendApi = (e:any)=>{
        if(e.target.name ==="nick_name"){
            setUserInfo(changeInfo);
            setChangeState_nickName(false);
        }else if(e.target.name ==="summary"){
            setUserInfo(changeInfo);
            setChangeState_summary(false);
        }else{
            if(e.target.value==="true"){
                setUserInfo({...userInfo,marketing_use:true});
            }else{
                setUserInfo({...userInfo,marketing_use:false});
            }
        }
    }

    useEffect(()=>{
        setUserInfo(userInfomation);
        setChangeInfo(userInfomation);
    },[])
    
    return (
      <div style={{width:"100%",display:"flex",flexDirection:"column"}}>

        <div style={{width:"100%",maxWidth:"560px"}}>

            <div className="inputPageTextBox">
                <div className="userInputPage">프로필 이미지</div>
            </div>
            <div className="profileImgBox" style={{marginBottom:'16px'}}>
                <div className="profileImgBox_img"></div>
                <div className="profileImgBox_btnbox">
                    <div className="profileImgBox_btnbox_btnbox">
                        <div className="emptyRecBtn" style={{marginRight:"8px"}}>이미지 업로드</div>
                        <div className="emptyRecBtn">삭제</div>
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
                    <button className="user_adminPage_userInfoPage_savebtn" name="nick_name" onClick={sendApi}>저장</button>
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
                    <button className="user_adminPage_userInfoPage_savebtn" name="summary" onClick={sendApi}>저장</button>
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
                    <button className={userInfo.marketing_use?"radio_on":"radio_off"} name="marketing_use" value="true" onClick={sendApi}></button>
                    <div>예</div>
                </div>

                <div className="marketing_box">
                    <button className={!userInfo.marketing_use?"radio_on":"radio_off"} name="marketing_use" value="false" onClick={sendApi}></button>
                    <div>아니오</div>
                </div>
            </div>
        
        </div>

      </div>
    );
};

export default UserInfo;