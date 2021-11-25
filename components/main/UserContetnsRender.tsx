import * as React from 'react';
import Link from 'next/link';

import dynamic from 'next/dynamic';

type Props = {
    id:number;
    title:string;
    thumbnail:string;
    summary:string;
    comments:number;
    upload_time:string;
    profile_thumnail:string;
    nick_name:string;
    link_url:string;
    blog_name:string;
    user_my_url:string;

};

function UserContetnsRender(item:any){
    
    console.log(item.item.thumbnail);
    return(
        <Link href={`/${item.item.my_url}/${item.item.id}`}>
            <a style={{
                width:"100%",
                cursor:"pointer",
                marginBottom:"24px",
                display: "block"
                }}
                className="userPage_item">
                <div>
                    <h4 className="userPageTitle">{item.item.title}</h4>
                    <div style={{
                        width:"100%",
                        display:(item.item.thumbnail === "" || item.item.thumbnail === "undefined")?"block":"flex",
                        justifyContent:"space-between",
                        }}>
                        <div style={{minWidth:"360px"}}>
                            <p className="userPageSummary">{item.item.summary}</p>
                            <div className="userPageInfoBox">
                                {/* <div className="userPageComments">{item.item.comments}개의 코멘트 ·</div> */}
                                <div className="userPageUploadTime">{item.item.ago_time}</div>
                            </div>
                        </div>
                        {(!item.item.thumbnail||item.item.thumbnail === ""||item.item.thumbnail !== "undefined")&&
                        <div className="userBlog_mainContents_textList_img" style={{backgroundImage:`url(${item.item.thumbnail})`}}>
                        </div>}
                    </div>

                </div>
            </a>
        </Link>
    )
}

export default UserContetnsRender;