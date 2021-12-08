import * as React from 'react';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import UserMainHeader from '../../components/common/UserMainHeader';
import dynamic from 'next/dynamic';
import HeadInfo from '../../components/common/HeadInfo';
import axios from 'axios';
const ReadText = dynamic(()=>import("../../components/editor/ReadingEditor"),{ssr:false});

function About(){
    const [renderState,setRenderState] = useState<boolean>(false);
    const [userName,setUserName] = useState<string>("");
    const [adState,setAdState] = useState<boolean>(true);
    const [currentUser,setCurrentUser] = useState<string>("");
    const [deletState,setDeletState] = useState<boolean>(false);
    const [textInfo,setTextInfo] = useState<any>({
      title:"드롭박스의 전설적인 MVP: 작동하는 동영상으로 수 만의 고객 모으기",
      summary:"안녕하세요, 김민우입니다. 그로스, 프로덕트, 매니지먼트, 커뮤니케이션, 그 외 일과 관련된 글을 쓰고, 스타트업 자문/컨설팅을 하고 있습니다. Subscribe Now 버튼을 눌러서 새 글을 메일로 간편하게 받아 보세요.",
      maintext:"안녕하세요, 김민우입니다. 그로스, 프로덕트, 매니지먼트, 커뮤니케이션, 그 외",
      category:"",
      my_url:"hihihi",
      nick_name:"블로그 닉네임",
      ago_time:"17분전",
      profile_img:"",
      blog_name:"",
    }) 

    const writgetApi = async()=>{
      const data = new FormData();
      data.append("id",window.location.pathname.slice(window.location.pathname.indexOf("/",1)+1,));
      data.append("type","getBlog");
      try{
          await axios(
          {
              method:"post",
              url:"https://proveit.cafe24.com/api2/blog.php",
              data
          }
          ).then((e)=>{
          if(e.data.ret_code ==="0000"){
            if(e.data.blog ===null){

            }else{
              console.log(e.data.blog);
              setTextInfo({...e.data.blog,maintext:JSON.parse(e.data.blog.maintext)});
            }
          }else{
          }
          }).then(()=>{
            setRenderState(true);
          })
      }catch{
      }
    }

    const deleteApi = async()=>{
      const data = new FormData();
      data.append("type","deleteBlog");
      data.append("email",JSON.parse(sessionStorage.getItem("user_info")!).email);
      data.append("hash",JSON.parse(sessionStorage.getItem("user_info")!).hash);
      data.append("id",window.location.pathname.slice(window.location.pathname.indexOf("/",1)+1,));
      try{
          await axios(
          {
              method:"post",
              url:"https://proveit.cafe24.com/api2/blog.php",
              data
          }
          ).then((e)=>{
            console.log(e)
          if(e.data.ret_code ==="0000"){
            window.location.replace(`/${JSON.parse(sessionStorage.getItem("user_info")!).my_url}`);
            // const alink =document.createElement("a");
            // alink.href = `/${JSON.parse(sessionStorage.getItem("user_info")!).my_url}`;
            // alink.click();
          }else{
          }
          })
      }catch{
      }
    }

    useEffect(()=>{
        setUserName(window.location.pathname.slice(1,window.location.pathname.indexOf("/",1)));
        setCurrentUser(sessionStorage.getItem("user_info")?JSON.parse(sessionStorage.getItem("user_info")!).my_url:null);
        setTimeout(() => {
          setAdState(false);
        }, 3000);
        writgetApi();
      },[]);

    return (
      <>
      {renderState&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <HeadInfo pagetitle={textInfo.title} pagedescription={textInfo.summary}></HeadInfo>
        <UserMainHeader userUrl={userName} nick_name={textInfo.nick_name} blog_name={textInfo.blog_name}></UserMainHeader>
        <div className="textPageContents">
          <h1 className="textPageContents_title">{textInfo.title}</h1>
          <p className="textPageContents_summary">{textInfo.summary}</p>
          <div className="textPageContents_writerInfoBox">
            <Link href={`/${textInfo.my_url}`}>
              <a className="textPageContents_writerInfoBox_profile" style={{backgroundImage:`url("https://proveit.cafe24.com${textInfo.profile_img}")`}}></a>
            </Link>
            <Link href={`/${textInfo.my_url}`}>
              <a className="textPageContents_writerInfoBox_writer">{textInfo.nick_name}</a>
            </Link>
            <div className="textPageContents_writerInfoBox_time">· {textInfo.ago_time}</div>
           
            {currentUser===textInfo.my_url&& <div className="textPageContents_write_adminBox">
              
              <Link href={`/textmodify/${window.location.pathname.slice(window.location.pathname.indexOf("/",1)+1,)}`}>
                <a className="textPageContents_write_adminBox_btn">
                  <div className="textPageContents_write_adminBox_btn_modifyIcon"></div>
                  <div className="textPageContents_write_adminBox_btn_text">수정</div>
                </a>
              </Link>
                            
              <div className="textPageContents_write_adminBox_btn">
                <div className="textPageContents_write_adminBox_btn_delIcon"></div>
                <div className="textPageContents_write_adminBox_btn_text" onClick={()=>{setDeletState(true)}}>삭제</div>
              </div>

            </div>}
          </div>
        </div>
        <ReadText text={textInfo.maintext}></ReadText>
        <Link href={`/${textInfo.my_url}`}>
          <a className="textPageContents_footer">
            <div className="textPageContents_footer_profileImg" style={{backgroundImage:`url("https://proveit.cafe24.com${textInfo.profile_img}")`}}></div>
            <div className="textPageContents_footer_writerInfo">
              <div className="textPageContents_footer_writerInfo_nickName">{textInfo.nick_name}</div>
              <div className="textPageContents_footer_writerInfo_summary">{textInfo.user_summary}</div>
            </div>
          </a>
        </Link>

        {deletState&&<div className="deletWindow">
          <div className="deletWindow_alret">
            <div className="deletWindow_alret_text">포스팅을 삭제하시겠습니까?</div>
            <div className="deletWindow_alret_btnList">
              <div className="deletWindow_alret_cancelBtn" onClick={()=>{setDeletState(false)}}>취소</div>
              <div className="deletWindow_alret_okBtn" onClick={deleteApi}>삭제</div> 
            </div>  
          </div>  
        </div>}
      </div>}
        {(adState&&currentUser!==textInfo.my_url)&&<div className="adPage">
        <div className="adPageLoading">
          <div className="loadingBar"></div>
        </div> 
        </div>}
      </>
    );
};

export default About;
