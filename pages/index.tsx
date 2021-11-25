import axios from 'axios';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import HeadInfo from '../components/common/HeadInfo';
import MainContentsRender from '../components/main/MainContentsRender';


const Home: NextPage = () => {
  const [renderState,setRenderState] = useState<boolean>(false);
  const [contentsArray,setContentsArray] = useState<any[]>([
    {
      id:0,
      title:"컴공으로 유학가기 좋은 곳(TOP 10)",
      thumbnail:"",
      summary:"6번 요약글",
      ago_time:"1시간 전",
      profile_img:"",
      nick_name:"유저 닉네임",
      my_url:"3333333",
      // comments:0,
      // blog_name:"첫번째 블로그",
      // link_url:""
    }
  ]);

  let cell: 1|2|3 =1;

  const size:any = useWindowSize();

  let cell_1:object[]=[];
  let cell_2:object[]=[];
  let cell_3:object[]=[];


  function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
      if (!isClient) {
        return false;
      }

      function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, ); 

    return windowSize;

    //https://jcon.tistory.com/121
  }

  function cellCount(){
    if(size.width>=1160){
      cell=3;
    }else if(size.width>=760){
      cell=2;
    }else{
      cell=1;
    }
    
  }

  function inputCell(){

    const defaultArray = contentsArray;
    if(cell===1){
      cell_1=defaultArray;
    }else if(cell===2){

      let flag:1|2 = 1;

      for(let i = 0 ; i<defaultArray.length ; i++){

        if(flag===1){
          cell_1.push(defaultArray[i]);
          flag=2;
        }else{
          cell_2.push(defaultArray[i]);
          flag=1;
        }
        
      }
    }else if(cell===3){

      let flag:1|2|3 = 1;

      for(let i = 0 ; i<defaultArray.length ; i++){

        if(flag===1){
          cell_1.push(defaultArray[i]);
          flag=2;
        }else if(flag===2){
          cell_2.push(defaultArray[i]);
          flag=3;
        }else{
          cell_3.push(defaultArray[i]);
          flag=1;
        }
        
      }
    }
  }

  const listGetApi = async()=>{
      const data = new FormData();
      data.append("category","");
      data.append("my_url","");
      data.append("type","getList");
      try{
        await axios(
          {
            method:"post",
            url:"https://newblo.co.kr/api2/blog.php",
            data
          }
        ).then((e)=>{
          if(e.data.ret_code ==="0000"){
            setContentsArray(e.data.list);
            setRenderState(true);
          }else{
          }
        })
      }catch{
      }
  }

  useEffect(()=>{
    listGetApi();
  },[])
  

  cellCount();
  inputCell();
  return (
    <>
    {renderState&&<div>
      <HeadInfo pageType="defalut" pagetitle="뉴블로 | 뉴블로" pagedescription="뉴블로 설명글"></HeadInfo>
      <Header></Header>
      <div style={{display:"flex",justifyContent:"center"}}>
        <div style={{display:"flex",maxWidth:"1160px",justifyContent:"space-between"}}>
          <div>
            {cell_1.map((item:any)=>(<MainContentsRender item={item} key={item.id}/>))}
          </div>
            {cell>=2&&<div style={{marginLeft:"40px"}}>
            {cell_2.map((item:any)=>(<MainContentsRender item={item} key={item.id}/>))}
            </div>}
            {cell>=3&&<div style={{marginLeft:"40px"}}>
              {cell_3.map((item:any)=>(<MainContentsRender item={item} key={item.id}/>))}
            </div>}
        </div>
      </div>
    </div>}
    </>
  )
}

export default Home
