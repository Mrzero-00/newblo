import axios from 'axios';
import { useEffect, useState } from 'react';
import HeadInfo from '../../components/HtmlHeader/HeadInfo';
import UserHeader from '../../components/gnb/UserHeader';
import UserContentsRender from '../../components/userHome/UserContentsRender';
import {useRouter} from 'next/router';
import UserInfo from '../../components/userHome/UserInfo';
import FollowRender from '../../components/userHome/FollowRender';

function followings(props){
    const router = useRouter();
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
    

  const followingsApi = async(id)=>{
    const data = new FormData();
    data.append("blogName",id);
    try{
      await axios(
        {
          method:"post",
          url:"/api/userHome/followings",
          data
        }
      ).then((e)=>{
        if(e.data.code ==="0000"){
          console.log(e.data.data);
          setUserPageState(e.data.data);
          setRenderState(true);
        }else{
        }
      })
    }catch{
    }
  }

  const subsribeLogic = (my,your,type)=>{
    if(currentUser){
      subsribeApi(my,your,type);
    }else{
      alert("로그인해주셈")
    }
  }

  const subsribeApi = async(my,your,type)=>{
    const data = new FormData();
    console.log(type);
    data.append("myBlogName",decodeURI(my));
    data.append("yourBlogName",decodeURI(your));
    data.append("type",type?"cancel":"subsribe");
    try{
      await axios(
        {
          method:"post",
          url:"/api/user/subsribe",
          data
        }
      ).then((e)=>{
        console.log(e);
        followingsApi(decodeURI(window.location.pathname.slice(1,window.location.pathname.lastIndexOf('/'))));
      })
    }catch{

    }
  }
    
useEffect(() => {
  if(sessionStorage.getItem("user_info")){
    setCurrentUser(JSON.parse(sessionStorage.getItem("user_info")).blogName);
  }
  followingsApi(decodeURI(window.location.pathname.slice(1,window.location.pathname.lastIndexOf('/'))));
}, []); 
      return (
        <>
          {renderState&&<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            
              <HeadInfo pagetitle={`${userPageState.userData.nickname} | 뉴블로`} pagedescription={userPageState.userData.introText}></HeadInfo>
              <UserHeader userUrl={userPageState.userData.blogName} nick_name={userPageState.userData.nickname}></UserHeader>
              <div style={{width:"100%",maxWidth:"688px",marginTop:"64px",borderBottom:"1px solid #F0F0F0"}}>
                <UserInfo userPageState={userPageState} currentUser={currentUser} subsribeLogic={subsribeLogic}></UserInfo>
              </div>
              <div style={{width:"100%",maxWidth:"688px"}}>
                <div className='followText'>{userPageState.userData.nickname}님이 구독하는 {userPageState.userData.following.length}명</div>
                {userPageState.userData.following.length>0&&
                  userPageState.userData.following.map((item)=>(<FollowRender item={item} subsribeLogic={subsribeLogic} currentUser={currentUser}></FollowRender>))
                }
              </div>
          </div>}
        </>
      )
};

export default followings;