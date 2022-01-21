import * as React from 'react';
import Link from 'next/link';

function UserInfo({userPageState,currentUser,subsribeLogic}){
    return(
        <div className="userProfile">
            <div  className="userProfile__img" style={{backgroundImage:`url("https://proveit.cafe24.com${userPageState.userData.profile_img}")`}}></div>
            <div  className="userProfile__info">
            <div className='userProfile__info__list'>
                <div className="userProfile__info__nickname">{userPageState.userData.nickname}</div>
                {currentUser!==userPageState.userData.blogName&&
                <div className={userPageState.userData.followers.includes(currentUser)?"subBtn--on":"subBtn"}
                onClick={subsribeLogic}
                onMouseOver={(e)=>{
                if(userPageState.userData.followers.includes(currentUser)){
                    e.target.innerHTML="구독 취소";
                }}}
                onMouseLeave={(e)=>{
                if(userPageState.userData.followers.includes(currentUser)){
                    e.target.innerHTML="구독 중";
                }}}
                >
                {userPageState.userData.followers.includes(currentUser)?"구독 중":"구독하기"}
                </div>}
            </div>
                <div className="userProfile__info__summary">{userPageState.userData.introText}</div>
                <div className='userProfile__btn'>
                <Link href={`/${userPageState.userData.blogName}/followers`}>
                    <a className="userProfile__btn--small">구독자 {userPageState.userData.followers.length}</a>
                </Link>
                <Link href={`/${userPageState.userData.blogName}/followings`}>
                    <a className="userProfile__btn--small">구독중 {userPageState.userData.following.length}</a>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;