import * as React from 'react';
import Link from 'next/link';

function FollowRender({item,subsribeLogic,currentUser}){
    return(
        <div className='followListBox'>
            <Link href={`/${item.blogName}`}>
                <a className='followListBox__profileImg'></a>
            </Link>
            <Link href={`/${item.blogName}`}>
                <a className='followListBox__textBox'>
                    <div className='followListBox__textBox__nickname'>{item.nickname}</div>
                    <div className='followListBox__textBox__intro'>{item.introText}dddd</div>
                </a>
            </Link>
            <div className={item.followers.includes(currentUser)?"followListBox__subBtn--on":"followListBox__subBtn"}
                onClick={()=>{subsribeLogic(currentUser,item.blogName,item.followers.includes(currentUser))}}
                onMouseOver={(e)=>{
                if(item.followers.includes(currentUser)){
                    e.target.innerHTML="구독 취소";
                }}}
                onMouseLeave={(e)=>{
                if(item.followers.includes(currentUser)){
                    e.target.innerHTML="구독 중";
                }}}
                >
                {item.followers.includes(currentUser)?"구독 중":"구독하기"}
            </div>
        </div>
    )
}

export default FollowRender;