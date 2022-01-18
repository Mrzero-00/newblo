import axios from 'axios';
import { useEffect, useState } from 'react';
import HeadInfo from '../components/HtmlHeader/HeadInfo';
import UserHeader from '../components/gnb/UserHeader';
import UserContentsRender from '../components/userHome/UserContentsRender';

function About(props){

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
        console.log(e.data.data);
        if(e.data.code ==="0000"){
          setUserPageState(e.data.data);
          setRenderState(true);
        }else{
        }
      })
    }catch{
    }
}
    
useEffect(() => {
  userHomeApi(decodeURI(window.location.pathname.slice(1)));
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
                        <div className="userProfile__info__nickname">{userPageState.userData.nickname}</div>
                        <div className="userProfile__info__summary">{userPageState.userData.introText}</div>
                        <div className='userProfile__btn'>
                          <div className="userProfile__btn--small">구독 24</div>
                          <div className="userProfile__btn--small">구독</div>
                        </div>
                    </div>
                </div>
              </div>
              <div style={{width:"100%",maxWidth:"688px"}}>
                <div className="userArticleList">
                   {userPageState.postData.map((item)=>(<UserContentsRender key={item.id} item={item}></UserContentsRender>))}
                </div>
              </div>
          </div>}
        </>
      )
};

export default About;