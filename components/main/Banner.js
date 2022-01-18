import React from 'react';

const Banner = ()=>{
  return(
  <div className='banner'>
       <div className='banner-1'>
            <div className='banner__copywrite'>우리는 좋은 경험을 나누는 사람들의
                수익을 최우선으로 생각합니다.</div>
       </div>
       <div className='banner-2'>
            <div className='banner__copywrite'>뉴-파트너 사전 신청</div>
            <div className='banner-2__partnerCounter'>현재 파트너 수:8명</div>
            <div className='banner-2__rewardCounter'>이달의 리워드 총액:120,000원</div>
       </div>
       <div className='banner-3'>
            <div className='banner__copywrite'>베타테스트가 종료되면,
                리워드가 시작됩니다.</div>
       </div>
  </div>  
  )
}

export default Banner;