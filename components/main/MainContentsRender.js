import * as React from 'react';
import Link from 'next/link';

function MainContentsRender({item}){
    return(
        <a className='mainPage__contentsList--item'>            
            <Link className="mainPage__contentsList__item--img" href={`/${item.blogName}/${item._id}`}>
                <a style={{cursor:"pointer",display:"block"}}>
                    {(item.thumbnail!==""&&item.thumbnail!=="undefined")&&<img src={item.thumbnail} className="mainPage__contentsList__item--img"></img>}
                </a>
            </Link>
            <div className='mainPage__contentsList__item--text'>
                <Link href={`/${item.blogName}/${item._id}`}>
                    <a style={{cursor:"pointer",display:"block"}}
                        className="mainPageView">
                        <h4 className="mainPage__contentsList__item__text--title">{item.title}</h4>
                        {(item.thumbnail!==""&&item.thumbnail!=="undefined")&&<div className="mainItemThumbnail" style={{backgroundImage:`url("${item.thumbnail}")`}}></div>}
                        <p className="mainPage__contentsList__item__text--summary">{item.summary}</p>
                    </a>
                </Link>
                <Link href={`/${item.author.blogName}`}>
                <a className="mainItemUserBox">
                    <div className="mainItemUserProfile" style={{backgroundImage:`url("https://proveit.cafe24.com${item.author.profile_img}")`}}></div>
                    <div>
                        <div className="mainItemUserName">{item.author.nickname}</div>
                        <div className="mainItemUploadTime">{item.createAt}</div>
                    </div>
                </a>
                </Link>
            </div>
        
        </a>
    )
}

export default MainContentsRender;