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
    console.log(item);
    return(
        <a style={{
            width:"100%",
            display:"flex",
            justifyContent:"flex-end",
            flexDirection:"row-reverse",
            maxWidth:"780px",
            marginLeft:(item.cell==="cell_1"&&item.renderType===2)?"auto":"0px",
            zIndex:999,
            height: "264px",
            padding:"32px 20px 32px 20px",
            }}>
            {item.index%2===0&&<div style={{backgroundColor:"#EDE9DC",width:"100%",height:"264px",position:"absolute",transform:"translate(0px,-32px)",left:"0px",zIndex:-1}}></div>}
            
            <Link href={`/${item.item.my_url}/${item.item.id}`}>
                    <a style={{cursor:"pointer",display:"block"}}>
                        {(item.item.thumbnail!==""&&item.item.thumbnail!=="undefined")&&<img src={item.item.thumbnail} className="mainItemThumbnail"></img>}
                    </a>
            </Link>
            <div style={{width:"100%",height:"200px"}}>
                <Link href={`/${item.item.my_url}/${item.item.id}`}>
                    <a style={{cursor:"pointer",display:"block"}}
                            className="mainPageView">
                            <h4 className="mainItemTitle">{item.item.title}</h4>
                            {/* {(item.item.thumbnail!==""&&item.item.thumbnail!=="undefined")&&<div className="mainItemThumbnail" style={{backgroundImage:`url("${item.item.thumbnail}")`}}></div>} */}
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
                        }}>
                    <div className="mainItemUserProfile" style={{backgroundImage:`url("https://proveit.cafe24.com${item.item.profile_img}")`}}></div>
                    <div className="mainItemUserName">{item.item.nick_name}</div>
                </a>
                </Link>
            </div>
            
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