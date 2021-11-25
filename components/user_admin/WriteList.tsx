import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const WriteRender =({item}:{item:any})=>{
    return(
        <Link href={`${item.link_url}`}>
            <a className="user_adminPage_WriteListPage_item">
                <div className="user_adminPage_WriteListPage_title_title">{item.title}</div>
                <div className="user_adminPage_WriteListPage_title_category">{item.category}</div>
                <div className="user_adminPage_WriteListPage_title_state">{item.state}</div>
                <div className="user_adminPage_WriteListPage_title_update">{item.upload_time}</div>
                <div className="user_adminPage_WriteListPage_title_writer">{item.nick_name}</div>
            </a>
        </Link>
    )
}


function WriteList({list}:{list:any}){
    const [rederState,setRenderState] = useState<boolean>(false);
    const [writeList,setWriteList] = useState<object[]>([
        {
            id:0,
            title:"제목",
            category:"카테고리",
            state:"상태",
            upload_time:"업데이트",
            nick_name:"작성자"
        }
    ]);
    useEffect(()=>{
        setWriteList(list);
        setRenderState(true);
    },[]);
    
    return (
        <>
            {rederState&&<div>
                <div className="user_adminPage_WriteListPage_title">
                    <div className="user_adminPage_WriteListPage_title_title">제목</div>
                    <div className="user_adminPage_WriteListPage_title_category">카테고리</div>
                    <div className="user_adminPage_WriteListPage_title_state">상태</div>
                    <div className="user_adminPage_WriteListPage_title_update">업데이트</div>
                    <div className="user_adminPage_WriteListPage_title_writer">작성자</div>
                </div>
                {writeList.map((item:any)=>(<WriteRender key={item.id} item={item}></WriteRender>))}
            </div>}
        </>
    );
};

export default WriteList;