import * as React from 'react';
import { useState, useEffect } from 'react';
import UserMainHeader from '../../components/common/UserMainHeader';
import WriteList from '../../components/user_admin/WriteList';
import UserInfo from '../../components/user_admin/UserInfo';
import axios from 'axios';


function Admin(){

    const [renderState,setRenderState] = useState<boolean>(false);
    const [pageState,setPageState] = useState<number>(0);

    const [userState,setUserState] = useState<any>({
      userInfo:{
        email: "mrprins90@naver.com",
        hash: "",
        nick_name:"ㅇㅇㅇㅇ",
        summary:"dididididi",
        marketing_use:false,
      },
      blogInfo:{
        blog_name:"뉴블로팀 공식 블로그",
        main_page_summary:"안녕하세요, 김민우입니다. 그로스, 프로덕트, 매니지먼트, 커뮤니케이션,그 외 일과 관련된 글을 쓰고, 스타트업 자문/컨설팅을 하고 있습니다.Subscribe Now 버튼을 눌러서 새 글을 메일로 간편하게 받아 보세요.",
        profile_thumnail:"",
        main_page_thumnail:"",
        main_page_title_view:true,
        main_page_summary_view:true,

      },
      user_write_list:[
        {
          id:0,
          title:"공정성의 함정: 얼룩소로 보는 ‘정의론'",
          thumbnail:"",
          category:"없음",
          state:"발행됨",
          summary:"6번 요약글",
          comments:0,
          upload_time:"2021-11-08",
          profile_thumnail:"",
          nick_name:"닉네임",
          blog_name:"첫번째 블로그",
          user_my_url:"3333333",
          link_url:"/123/123"
        },
        {
          id:1,
          title:"주먹으로 그린 인간의 크기란?",
          thumbnail:"",
          category:"없음",
          state:"발행됨",
          summary:"6번 요약글",
          comments:0,
          upload_time:"2021-11-08",
          profile_thumnail:"",
          nick_name:"닉네임",
          blog_name:"첫번째 블로그",
          user_my_url:"3333333",
          link_url:"/123/123"
        },
        {
          id:2,
          title:"“아프면 쉬어라. 그리고 쉬게 해줘라” 위드코로나 시대에 우리가 지켜야 할...",
          thumbnail:"",
          category:"없음",
          state:"발행됨",
          summary:"6번 요약글",
          comments:0,
          upload_time:"2021-11-08",
          profile_thumnail:"",
          nick_name:"닉네임",
          blog_name:"첫번째 블로그",
          user_my_url:"3333333",
          link_url:"/123/123"
        },
        {
          id:3,
          title:"컴공으로 유학가기 좋은 곳 TOP 10",
          thumbnail:"",
          category:"없음",
          state:"발행됨",
          summary:"6번 요약글",
          comments:0,
          upload_time:"2021-11-08",
          profile_thumnail:"",
          nick_name:"닉네임",
          blog_name:"첫번째 블로그",
          user_my_url:"3333333",
          link_url:"/123/123"
        },
        {
          id:4,
          title:"모든 교통수단을 모아 MaaS: 모빌리티 대통합의 시대",
          thumbnail:"",
          category:"없음",
          state:"발행됨",
          summary:"6번 요약글",
          comments:0,
          upload_time:"2021-11-08",
          profile_thumnail:"",
          nick_name:"닉네임",
          blog_name:"첫번째 블로그",
          user_my_url:"3333333",
          link_url:"/123/123"
        },
        {
          id:5,
          title:"계급이 돌아왔다 : 이대남 현상이라는 착시",
          thumbnail:"",
          category:"없음",
          state:"발행됨",
          summary:"6번 요약글",
          comments:0,
          upload_time:"2021-11-08",
          profile_thumnail:"",
          nick_name:"닉네임",
          blog_name:"첫번째 블로그",
          user_my_url:"3333333",
          link_url:"/123/123"
        },
      ]
    });

    useEffect(()=>{
      userInfoApi();
    },[])

    const listGetApi = async(user:any)=>{
      const data = new FormData();
      data.append("category","");
      data.append("my_url",JSON.parse(sessionStorage.getItem("user_info")!).my_url);
      data.append("type","getList");
      try{
        await axios(
          {
            method:"post",
            url:"https://newblo.co.kr/api2/blog.php",
            data
          }
        ).then((e)=>{
          console.log(e);
          if(e.data.ret_code ==="0000"){
            setUserState({user_write_list:e.data.list,userInfo:user});
            setRenderState(true);
          }else{
          }
        })
      }catch{
      }
  }


    const userInfoApi = async()=>{
      const data = new FormData();
      data.append("my_url",JSON.parse(sessionStorage.getItem("user_info")!).my_url);
      data.append("type","userInfo");
      try{
          await axios(
          {
              method:"post",
              url:"https://newblo.co.kr/api2/user.php",
              data
          }
          ).then((e:any)=>{
          if(e.data.ret_code ==="0000"){
            sessionStorage.setItem("user_info",JSON.stringify({
              ...JSON.parse(sessionStorage.getItem("user_info")!),
              profile_img:e.data.user.profile_img,
              nick_name:e.data.user.nick_name
            }));
            listGetApi(e.data.user);
          }else{
          }
          })
      }catch{
      }
    }
    
    return (
      <>
        {renderState&&<div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <UserMainHeader userUrl={userState.userInfo.my_url} nick_name={userState.userInfo.nick_name}></UserMainHeader>
          <div style={{width:"100%",height:"1px",backgroundColor:"#dcdcdc"}}></div>
          <div className="user_adminPage">
              <div className="user_adminPage_list">
                  <div className="user_adminPage_list_title">블로그 관리</div>
                  <div className="user_adminPage_list_page" onClick={()=>{setPageState(0);}}>
                      <div className={pageState===0?"user_adminPage_list_page_writeIcon_select":"user_adminPage_list_page_writeIcon"}></div>
                      <div className={pageState===0?"user_adminPage_list_page_text_select":"user_adminPage_list_page_text"}>글 목록</div>
                  </div>
                  <div className="user_adminPage_list_page" onClick={()=>{setPageState(1);}}>
                      <div className={pageState===1?"user_adminPage_list_page_userInfo_select":"user_adminPage_list_page_userInfo"}></div>
                      <div className={pageState===1?"user_adminPage_list_page_text_select":"user_adminPage_list_page_text"}>회원 정보</div>
                  </div>
                  {/* <div className="user_adminPage_list_page" onClick={()=>{setPageState(2);}}>
                      <div className={pageState===2?"user_adminPage_list_page_blogSetting_select":"user_adminPage_list_page_blogSetting"}></div>
                      <div className={pageState===2?"user_adminPage_list_page_text_select":"user_adminPage_list_page_text"}>타이틀 설정</div>
                  </div> */}
              </div>
              <div className="user_adminPage_modifyPage">
                {pageState===0&& <WriteList list={userState.user_write_list}></WriteList>}
                {pageState===1&& <UserInfo userInfomation={userState.userInfo} userInfoApi={userInfoApi}></UserInfo>}
                {/* {pageState===2&& <BlogSetting blogInfomation={userState.blogInfo}></BlogSetting>} */}
              </div>
          </div>
        </div>}
      </>
    );
};

export default Admin;