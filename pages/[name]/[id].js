import * as React from 'react';
import { useState,useEffect,useRef } from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import PostHeader from '../../components/gnb/PostHeader';
import dynamic from 'next/dynamic';
import HeadInfo from '../../components/HtmlHeader/HeadInfo';
import axios from 'axios';
const ReadText = dynamic(()=>import("../../components/editor/ReadingEditor"),{ssr:false});

function About(){
    const router = useRouter();
    const [renderState,setRenderState] = useState(false);
    const [userName,setUserName] = useState("");
    const [adState,setAdState] = useState(true);
    const [currentUser,setCurrentUser] = useState("");
    const [deletState,setDeletState] = useState(false);
    const copyUrl = useRef("");
    const [postInfo,setPostInfo] = useState({
        title:"드롭박스의 전설적인 MVP: 작동하는 동영상으로 수 만의 고객 모으기",
        summary:"안녕하세요, 김민우입니다. 그로스, 프로덕트, 매니지먼트, 커뮤니케이션, 그 외 일과 관련된 글을 쓰고, 스타트업 자문/컨설팅을 하고 있습니다. Subscribe Now 버튼을 눌러서 새 글을 메일로 간편하게 받아 보세요.",
        mainText:"안녕하세요, 김민우입니다. 그로스, 프로덕트, 매니지먼트, 커뮤니케이션, 그 외",
        author:{
          blogName:"",
          nickname:""
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
            
            console.log(e)
            setPostInfo({
              ...e.data.data,mainText:JSON.parse(e.data.data.mainText)
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
      data.append("id",window.location.pathname.slice(window.location.pathname.indexOf("/",1)+1,));
      try{
          await axios(
          {
              method:"post",
              url:"/api/post/postDelete",
              data
          }
          ).then((e)=>{
            console.log(e);
          if(e.data.code ==="0000"){
            const alink =document.createElement("a");
            alink.href = `/${JSON.parse(sessionStorage.getItem("user_info")).blogName}`;
            alink.click();
          }else{
          }
          })
      }catch{
      }
    }

    const subsribeLogic = ()=>{
      if(currentUser){
        subsribeApi();
      }else{
        alert("로그인해주셈")
      }
    }
  
    const subsribeApi = async()=>{
      const data = new FormData();
      const subState =postInfo.author.followers.includes(currentUser);
      console.log(subState);
      data.append("myBlogName",decodeURI(currentUser));
      data.append("yourBlogName",decodeURI(postInfo.blogName));
      data.append("type",subState?"cancel":"subsribe");
      try{
        await axios(
          {
            method:"post",
            url:"/api/user/subsribe",
            data
          }
        ).then((e)=>{
          if(e.data.code==="0000"){
            writgetApi();
          }
        })
      }catch{
  
      }
    }

    useEffect(()=>{
        setUserName(window.location.pathname.slice(1,window.location.pathname.indexOf("/",1)));
        setCurrentUser(sessionStorage.getItem("user_info")?JSON.parse(sessionStorage.getItem("user_info")).blogName:"");
        setTimeout(() => {
          setAdState(false);
        }, 3000);
        writgetApi();
      },[]);

    

    return (
      <>
      {renderState&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <HeadInfo pagetitle={postInfo.title} pagedescription={postInfo.summary}></HeadInfo>
        <PostHeader userUrl={userName} nick_name={postInfo.author.nickname} blog_name={postInfo.author.blogName}></PostHeader>
        <div className="contentsPage">
          <h1 className="contents__title">{postInfo.title}</h1>
          <p className="contents__summary">{postInfo.summary}</p>
          <div className="contents__writerInfoBox">
            <Link href={`/${postInfo.author.blogName}`}>
              <a className="contents__writerInfoBox_profile" style={{backgroundImage:`url("https://proveit.cafe24.com${postInfo.author.profile_img}")`}}></a>
            </Link>
            <Link href={`/${postInfo.author.blogName}`}>
              <a className="contents__writerInfoBox_writer">{postInfo.author.nickname}</a>
            </Link>      
            <Link href={`/${postInfo.author.blogName}`}>
              <a className="contents__writerInfoBox_time">·   {postInfo.createAt}</a>
            </Link>    
            {currentUser===postInfo.author.blogName&& <div className="contents__write_adminBox">
              
              <Link href={`/modify/${router.query.id}`}>
                <a className="contents__write_adminBox_btn">
                  <div className="contents__write_adminBox_btn_modifyIcon"></div>
                  <div className="contents__write_adminBox_btn_text">수정</div>
                </a>
              </Link>
                            
              <div className="contents__write_adminBox_btn" onClick={()=>{setDeletState(true)}}>
                <div className="contents__write_adminBox_btn_delIcon"></div>
                <div className="contents__write_adminBox_btn_text">삭제</div>
              </div>

            </div>}
          </div>
        </div>
        <ReadText text={postInfo.mainText}></ReadText>
          <a className="contents__footer">
            <Link href={`/${postInfo.author.blogName}`}>
              <a className="contents__footer_profileImg" style={{backgroundImage:`url("https://proveit.cafe24.com${postInfo.author.profile_img}")`}}></a>
            </Link>
            <div className="contents__footer_writerInfo">
              <div className='userProfile__info__list'>
                
                        <Link href={`/${postInfo.blogName}`}>
                          <a className="userProfile__info__nickname">{postInfo.author.nickname}</a>
                        </Link>
                        {currentUser!==postInfo.blogName&&
                        <div className={postInfo.author.followers.includes(currentUser)?"subBtn--on":"subBtn"}
                        onClick={subsribeLogic}
                        onMouseOver={(e)=>{
                          if(postInfo.author.followers.includes(currentUser)){
                            e.target.innerHTML="구독 취소";
                          }}}
                        onMouseLeave={(e)=>{
                          if(postInfo.author.followers.includes(currentUser)){
                            e.target.innerHTML="구독 중";
                          }}}
                        >
                          {postInfo.author.followers.includes(currentUser)?"구독 중":"구독하기"}
                        </div>}
              </div>
              <div className="contents__footer_writerInfo_summary">{postInfo.author.introText}</div>
              <div className='userProfile__btn'>
                <div className="userProfile__btn--small">구독자 {postInfo.author.followers.length}</div>
                <div className="userProfile__btn--small">구독중 {postInfo.author.following.length}</div>
              </div>
            </div>
          </a>

        {deletState&&<div className="deletWindow">
          <div className="deletWindow_alret">
            <div className="deletWindow_alret_text">
              글을 삭제하시겠습니까?<br/>
            삭제한 글은 복구할 수 없습니다.</div>
            <div className="deletWindow_alret_btnList">
              <div className="deletWindow_alret_btn" onClick={()=>{setDeletState(false)}}>취소</div>
              <div className="deletWindow_alret_btn" onClick={deleteApi}>삭제</div> 
            </div>  
          </div>  
        </div>}
      </div>}
      {(adState&&currentUser!==postInfo.blogName)&&<div className="adPage">
      <div className="adPageLoading">
        <div className="loadingBar"></div>
      </div> 
      </div>}
      </>
    );
};

export default About;
