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

function MainContentsRender(item:any){
    return(
        <a>
            <Link href={`/${item.item.my_url}/${item.item.id}`}>
                <a style={{
                        width:"360px",
                        maxWidth:"360px",cursor:"pointer",display:"block"}}
                        className="mainPageView">
                        <h4 className="mainItemTitle">{item.item.title}</h4>
                        {/* {(item.item.thumbnail!==""&&item.item.thumbnail!=="undefined")&&<div className="mainItemThumbnail" style={{backgroundImage:`url("${item.item.thumbnail}")`}}></div>} */}
                        {(item.item.thumbnail!==""&&item.item.thumbnail!=="undefined")&&<img src={item.item.thumbnail} className="mainItemThumbnail"></img>}
                        <p className="mainItemSummary">{item.item.summary}</p>
                        <div className="mainItemInfoBox">
                            {/* <div className="mainItemComments">{item.item.comments}개의 코멘트 ·</div> */}
                            <div className="mainItemUploadTime">{item.item.ago_time}</div>
                        </div>
                </a>
            </Link>
            <Link href={`/${item.item.my_url}`}>
            <a className="mainItemUserBox" 
                style={{
                    paddingBottom:"24px",
                    borderBottom:"1px solid #dcdcdc"
                    }}>
                <div className="mainItemUserProfile" style={{backgroundImage:`url("https://newblo.co.kr${item.item.profile_img}")`}}></div>
                <div className="mainItemUserName">{item.item.nick_name}</div>
            </a>
            </Link>
        </a>
    )
}

// ContentsRender.defaultProps={
//     id:0,
//     title:"untitle",
//     thumbnail:"",
//     summary:"",
//     comments:0,
//     uploadTime:"",
//     profileThumnail:"",
//     userName:"",
//     linkUrl:""
// }

export default MainContentsRender;