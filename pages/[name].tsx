import axios from 'axios';
import { useEffect, useState } from 'react';
import HeadInfo from '../components/common/HeadInfo';
import UserMainHeader from '../components/common/UserMainHeader';
import UserContetnsRender from '../components/main/UserContetnsRender';

function About(props:any){
  const [renderState,setRenderState] = useState<boolean>(false); 
    const [userPageState,setUserPageState] = useState<any>({    
      user: {
        email: "",
        nick_name: "",
        profile_img: "",
        summary: "",
        my_url: ""
      },
      user_write_list:[
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
    

  const listGetApi = async(url:any,user:any)=>{
    const data = new FormData();
    data.append("category","");
    data.append("my_url",url);
    data.append("type","getList");
    try{
      await axios(
        {
          method:"post",
          url:"https://proveit.cafe24.com/api2/blog.php",
          data
        }
      ).then((e)=>{
        if(e.data.ret_code ==="0000"){
          setUserPageState({user:user,user_write_list:e.data.list});
          setRenderState(true);
        }else{
        }
      })
    }catch{
    }
}

const userInfoGetApi = async()=>{
  const data = new FormData();
  data.append("type","userInfo");
  data.append("my_url",window.location.pathname.slice(1));
  try{
    await axios(
      {
        method:"post",
        url:"https://proveit.cafe24.com/api2/user.php",
        data
      }
    ).then((e)=>{
      if(e.data.ret_code ==="0000"){
        listGetApi(window.location.pathname.slice(1),e.data.user);
      }else{
      }
    })
  }catch{
  }
}
  
    
useEffect(() => {
  userInfoGetApi();
}, []); 
console.log(userPageState);

      
      return (
        <>
          {renderState&&<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            
              <HeadInfo pagetitle={`${userPageState.user.nick_name} | 뉴블로`} pagedescription={userPageState.user.summary}></HeadInfo>
              <UserMainHeader userUrl={userPageState.user.my_url} nick_name={userPageState.user.nick_name}></UserMainHeader>
              <div style={{width:"100%",maxWidth:"1160px",marginTop:"52px"}}>
                <div className="userBlog_profileBox">
                    <div  className="userBlog_profileBox_thumbnail" style={{backgroundImage:`url("https://proveit.cafe24.com${userPageState.user.profile_img}")`}}></div>
                    <div  className="userBlog_profileBox_info">
                        <div className="userBlog_profileBox_info_nickname">{userPageState.user.nick_name}</div>
                        <div className="userBlog_profileBox_info_summary">{userPageState.user.summary}</div>
                    </div>
                </div>
                <div className="userBlog_mainContents">
                    <div className="userBlog_mainContents_textList">
                        <div className="userBlog_mainContents_title">최신 업데이트</div>
                        {userPageState.user_write_list.map((item:any)=>(<UserContetnsRender key={item.id} item={item} category={item}></UserContetnsRender>))}
                    </div>
                    <div className="userBlog_mainContents_category">
                        <div className="userBlog_mainContents_title">폴더</div>
                    </div>
                </div>
              </div>
          </div>}
        </>
      )
};

export default About;