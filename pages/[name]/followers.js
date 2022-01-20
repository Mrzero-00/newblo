import axios from 'axios';
import { useEffect, useState } from 'react';
import HeadInfo from '../../components/HtmlHeader/HeadInfo';
import UserHeader from '../../components/gnb/UserHeader';
import followRender from '../../components/userHome/followRender';

function followers(props){

  const [renderState,setRenderState] = useState(false); 
  const [currentUser,setCurrentUser] = useState("");
  const [userPageState,setUserPageState] = useState({    
    userData:{
      email: "",
      nickname: "",
      profile_img: "",
      introText: "",
      blogName: ""
    },
    postData:[
      {
        id:0,
        title:"컴공으로 유학가기 좋은 곳(TOP 10)",
        thumbnail:"/_next/static/media/test_1.0fbe0803.png",
        summary:"6번 요약글",
        comments:0,
        upload_time:"1시간 전",
        profile_thumnail:"",
        nick_name:"유저 닉네임",
        blog_name:"첫번째 블로그",
        user_my_url:"3333333",
        link_url:""
      },
      
    ]
  });
    

  const userHomeApi = async(user)=>{
    const data = new FormData();
    data.append("blogName",user);
    try{
      await axios(
        {
          method:"post",
          url:"/api/userHome/userHome",
          data
        }
      ).then((e)=>{
        if(e.data.code ==="0000"){
          setUserPageState(e.data.data);
          setRenderState(true);
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
    const subState =userPageState.userData.followers.includes(currentUser);
    data.append("myBlogName",decodeURI(currentUser));
    data.append("yourBlogName",decodeURI(userPageState.userData.blogName));
    data.append("type",subState?"cancel":"subsribe");
    try{
      await axios(
        {
          method:"post",
          url:"/api/user/subsribe",
          data
        }
      ).then((e)=>{
        userHomeApi(decodeURI(window.location.pathname.slice(1)));
      })
    }catch{

    }
  }
    
useEffect(() => {
  if(sessionStorage.getItem("user_info")){
    setCurrentUser(JSON.parse(sessionStorage.getItem("user_info")).blogName);
  }
  userHomeApi(decodeURI(window.location.pathname.slice(1,window.location.pathname.lastIndexOf('/'))));
}, []); 

      return (
        <>
          {renderState&&<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            
              <HeadInfo pagetitle={`${userPageState.userData.nickname} | 뉴블로`} pagedescription={userPageState.userData.introText}></HeadInfo>
              <UserHeader userUrl={userPageState.userData.blogName} nick_name={userPageState.userData.nickname}></UserHeader>
              <div style={{width:"100%",maxWidth:"688px",marginTop:"64px",borderBottom:"1px solid #F0F0F0",marginBottom:"32px"}}>
                <div className="userProfile">
                    <div  className="userProfile__img" style={{backgroundImage:`url("https://proveit.cafe24.com${userPageState.userData.profile_img}")`}}></div>
                    <div  className="userProfile__info">
                      <div className='userProfile__info__list'>
                        <div className="userProfile__info__nickname">{userPageState.userData.nickname}</div>
                        {currentUser!==userPageState.userData.blogName&&
                        <div className={userPageState.userData.followers.includes(currentUser)?"subBtn--on":"subBtn"}
                        onClick={subsribeLogic}
                        onMouseOver={(e)=>{
                          if(userPageState.userData.followers.includes(currentUser)){
                            e.target.innerHTML="구독 취소";
                          }}}
                        onMouseLeave={(e)=>{
                          if(userPageState.userData.followers.includes(currentUser)){
                            e.target.innerHTML="구독 중";
                          }}}
                        >
                          {userPageState.userData.followers.includes(currentUser)?"구독 중":"구독하기"}
                        </div>}
                      </div>
                        <div className="userProfile__info__summary">{userPageState.userData.introText}</div>
                        <div className='userProfile__btn'>
                          <div className="userProfile__btn--small">구독자 {userPageState.userData.followers.length}</div>
                          <div className="userProfile__btn--small">구독중 {userPageState.userData.following.length}</div>
                        </div>
                    </div>
                </div>
              </div>
              <div style={{width:"100%",maxWidth:"688px"}}>
                {userPageState.postData.length>0&&
                  <div className="userArticleList">
                    {userPageState.postData.map((item)=>(<followRender key={item.id} item={item}></followRender>))}
                  </div>
                }
                {userPageState.postData.length===0&&<div className='userArticle_noneText'>아직 작성된 글이 없습니다.</div>}
              </div>
          </div>}
        </>
      )
};

export default followers;