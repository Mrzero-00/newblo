import Header from '../components/gnb/Header';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DraftContentsRender from '../components/userHome/DraftContentsRender';



const draftList = ({posts})=>{
    const [isLoading,setIsLoading] = useState(false);
    const [draftList,setDraftList] = useState([]);

    const listGetApi = async()=>{
        const data = new FormData();
        data.append("category","");
        data.append("blogName",decodeURI(JSON.parse(sessionStorage.getItem("user_info")).blogName));
        data.append("type","draft");
        data.append("page",1);
  
        await axios(
          {
            method:"post",
            url:"/api/post/postList",
            data
          }
        ).then((e)=>{
          console.log(e);
          if(e.data.code ==="0000"){
            setIsLoading(true);
            setDraftList(e.data.data);
          }else{
          }
        })
    }

    useEffect(()=>{
        if(JSON.parse(sessionStorage.getItem("user_info"))){
            listGetApi();
        }else{
            const a = document.createElement('a');
            a.href = "/";
            a.click();
        }
    },[])
  return(
  <> 
    <Header/>
    {isLoading&&<div className='draftList'>
      <div className='draftList__title'>임시저장 글</div>
      {draftList.length===0&&<div className='draftList__noneList'>임시저장한 글이 없습니다.</div>}
      {draftList.length>0&&<div>
        {draftList.map((item,index)=>(<DraftContentsRender listGetApi={listGetApi} item={item} key={index}/>))}
        </div>}
    </div>}
  </>  
  )
}

export default draftList;