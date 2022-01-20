import axios from 'axios';
import {useEffect, useLayoutEffect, useRef, useState } from 'react';
import Header from '../components/gnb/Header';
import HeadInfo from '../components/HtmlHeader/HeadInfo';
import Banner from '../components/main/Banner';
import MainContentsRender from '../components/main/MainContentsRender';


const Home = () => {
  const [renderState,setRenderState] = useState(false);
  const layoutRef = useRef();
  const [contentsArray,setContentsArray] = useState([
    {
      _id:0,
      title:"컴공으로 유학가기 좋은 곳(TOP 10)",
      thumbnail:"dasda",
      summary:"6번 요약글",
      create_at:"1시간 전",
      profile_img:"dsd",
      nickname:"유저 닉네임",
      blogName:"3333333",
      author:{

      }
    }
  ]);

  const [category,setCategory] = useState(0);

  const listGetApi = async()=>{
      const data = new FormData();
      data.append("category","");
      data.append("my_url","");
      data.append("type","getList");
      data.append("page",1);

      await axios(
        {
          method:"post",
          url:"/api/post/postList",
          data
        }
      ).then((e)=>{
        setRenderState(true);
        if(e.data.code ==="0000"){
          setContentsArray(e.data.data);
        }else{
        }
      })
  }

  useEffect(()=>{
    listGetApi();
  },[])

  // const handleScroll = useCallback((e) => {
  //   console.log(e)
  // }, [])
  
  // useLayoutEffect(() => {
  //   if (layoutRef.current) {
  //     layoutRef.current.addEventListener('scroll', handleScroll);
  //     return () => layoutRef.current.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])
  
  return (
    <div ref={layoutRef} >
      <HeadInfo pageType="defalut" pagetitle="뉴블로 | 뉴블로" pagedescription="뉴블로 설명글"></HeadInfo>
      <Header></Header>
      <Banner></Banner>
      <div className="mainPage--categoryBox">
        <div className="mainPage__categoryBox--category">
          <div className={category===0?"mainPage__categoryBox__category--itemOn":"mainPage__categoryBox__category--itemOff"} onClick={()=>{setCategory(0)}}>전체</div>
          <div className={category===1?"mainPage__categoryBox__category--itemOn":"mainPage__categoryBox__category--itemOff"} onClick={()=>{setCategory(1)}}>맞춤</div>
          <div className={category===2?"mainPage__categoryBox__category--itemOn":"mainPage__categoryBox__category--itemOff"} onClick={()=>{setCategory(2)}}>ISSUE</div>
          <div className={category===3?"mainPage__categoryBox__category--itemOn":"mainPage__categoryBox__category--itemOff"} onClick={()=>{setCategory(3)}}>에세이</div>
          <div className={category===4?"mainPage__categoryBox__category--itemOn":"mainPage__categoryBox__category--itemOff"} onClick={()=>{setCategory(4)}}>TIL</div>
        </div>
      </div>
      {renderState&&<div className="mainPage--contentsList"style={{display:"flex"}}>
        {contentsArray.map((item,index)=>(<MainContentsRender item={item} index={index} key={index}/>))}
      </div>}
    </div>
  )
}

export default Home
