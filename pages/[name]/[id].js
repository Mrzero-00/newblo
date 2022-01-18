import * as React from 'react';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import PostHeader from '../../components/gnb/PostHeader';
import dynamic from 'next/dynamic';
import HeadInfo from '../../components/HtmlHeader/HeadInfo';
import axios from 'axios';
const ReadText = dynamic(()=>import("../../components/editor/ReadingEditor"),{ssr:false});

function About(){
    const [renderState,setRenderState] = useState(false);
    const [userName,setUserName] = useState("");
    const [adState,setAdState] = useState(true);
    const [currentUser,setCurrentUser] = useState("");
    const [deletState,setDeletState] = useState(false);
    const [postInfo,setPostInfo] = useState({
      textInfo:{
        title:"드롭박스의 전설적인 MVP: 작동하는 동영상으로 수 만의 고객 모으기",
        summary:"안녕하세요, 김민우입니다. 그로스, 프로덕트, 매니지먼트, 커뮤니케이션, 그 외 일과 관련된 글을 쓰고, 스타트업 자문/컨설팅을 하고 있습니다. Subscribe Now 버튼을 눌러서 새 글을 메일로 간편하게 받아 보세요.",
        mainText:"안녕하세요, 김민우입니다. 그로스, 프로덕트, 매니지먼트, 커뮤니케이션, 그 외",
        author:{
          blogName:"",
          nickname:""
        }
      }
      
    }) 
    

    const writgetApi = async()=>{
      const data = new FormData();
      data.append("postId",window.location.pathname.slice(window.location.pathname.indexOf("/",1)+1,)*1);
      data.append("blogName",decodeURI(window.location.pathname.slice(1,window.location.pathname.indexOf("/",1))));
      try{
          await axios(
          {
              method:"post",
              url:"/api/post/postGet",
              data
          }
          ).then((e)=>{
          if(e.data.code ==="0000"){
            setPostInfo({
              textInfo:{...e.data.data.postData,mainText:JSON.parse(e.data.data.postData.mainText)},
            });
            setRenderState(true);
          }else{
          }
          })
      }catch{
      }
    }

    const deleteApi = async()=>{
      const data = new FormData();
      data.append("type","deleteBlog");
      data.append("email",JSON.parse(sessionStorage.getItem("user_info")).email);
      data.append("hash",JSON.parse(sessionStorage.getItem("user_info")).hash);
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
            window.location.replace(`/${JSON.parse(sessionStorage.getItem("user_info")).my_url}`);
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
        setCurrentUser(sessionStorage.getItem("user_info")?JSON.parse(sessionStorage.getItem("user_info")).blogName:"");
        // setTimeout(() => {
        //   setAdState(false);
        // }, 3000);
        writgetApi();
        // console.log(window.location.pathname.slice(window.location.pathname.indexOf("/",1)+1,));
      },[]);

    return (
      <>
      {renderState&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <HeadInfo pagetitle={postInfo.textInfo.title} pagedescription={postInfo.textInfo.summary}></HeadInfo>
        <PostHeader userUrl={userName} nick_name={postInfo.textInfo.author.nickname} blog_name={postInfo.textInfo.author.blogName}></PostHeader>
        <div className="contentsPage">
          <h1 className="contents__title">{postInfo.textInfo.title}</h1>
          <p className="contents__summary">{postInfo.textInfo.summary}</p>
          <div className="contents__writerInfoBox">
            <Link href={`/${postInfo.textInfo.author.blogName}`}>
              <a className="contents__writerInfoBox_profile" style={{backgroundImage:`url("https://proveit.cafe24.com${postInfo.textInfo.author.profile_img}")`}}></a>
            </Link>
            <div style={{display:"flex",flexDirection:"column"}}>
              <Link href={`/${postInfo.textInfo.author.blogName}`}>
                <a className="contents__writerInfoBox_writer">{postInfo.textInfo.author.nickname}</a>
              </Link>          
              <Link href={`/${postInfo.textInfo.author.blogName}`}>
                <a className="contents__writerInfoBox_time">{postInfo.textInfo.createAt}</a>
              </Link>    
            </div>
            {currentUser===postInfo.textInfo.author.blogName&& <div className="contents__write_adminBox">
              
              <Link href={`/textmodify/${window.location.pathname.slice(window.location.pathname.indexOf("/",1)+1,)}`}>
                <a className="contents__write_adminBox_btn">
                  <div className="contents__write_adminBox_btn_modifyIcon"></div>
                  <div className="contents__write_adminBox_btn_text">수정</div>
                </a>
              </Link>
                            
              <div className="contents__write_adminBox_btn">
                <div className="contents__write_adminBox_btn_delIcon"></div>
                <div className="contents__write_adminBox_btn_text" onClick={()=>{setDeletState(true)}}>삭제</div>
              </div>

            </div>}
          </div>
        </div>
        <ReadText text={postInfo.textInfo.mainText}></ReadText>
        <Link href={`/${postInfo.textInfo.author.blogName}`}>
          <a className="contents__footer">
            <div className="contents__footer_profileImg" style={{backgroundImage:`url("https://proveit.cafe24.com${postInfo.textInfo.profile_img}")`}}></div>
            <div className="contents__footer_writerInfo">
              <div className="contents__footer_writerInfo_nickName">{postInfo.textInfo.author.nickname}</div>
              <div className="contents__footer_writerInfo_summary">{postInfo.textInfo.author.introText}</div>
              <div className='contents__footer_subscribe'>
                  <div className="contents__footer_subscribe__btn" style={{marginRight:"8px"}}>구독 24</div>
                  <div className="contents__footer_subscribe__btn">구독</div>
              </div>
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
        {(adState&&currentUser!==postInfo.textInfo.author.blogName)&&<div className="adPage">
        <div className="adPageLoading">
          <div className="loadingBar"></div>
        </div> 
        </div>}
      </>
    );
};

export default About;
