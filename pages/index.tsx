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
      thumbnail:"dasda",
      summary:"6번 요약글",
      ago_time:"1시간 전",
      profile_img:"dsd",
      nick_name:"유저 닉네임",
      my_url:"3333333",
    },
    {
      id:1,
      title:"컴공으로 유학가기 좋은 곳(TOP 10)",
      thumbnail:"dasdas",
      summary:"6번 요약글",
      ago_time:"1시간 전",
      profile_img:"",
      nick_name:"유저 닉네임",
      my_url:"3333333",
    },
    {
      id:2,
      title:"컴공으로 유학가기 좋은 곳(TOP 10)",
      thumbnail:"",
      summary:"6번 요약글",
      ago_time:"1시간 전",
      profile_img:"dsd",
      nick_name:"유저 닉네임",
      my_url:"3333333",
    },    {
      id:3,
      title:"컴공으로 유학가기 좋은 곳(TOP 10)",
      thumbnail:"",
      summary:"6번 요약글",
      ago_time:"1시간 전",
      profile_img:"",
      nick_name:"유저 닉네임",
      my_url:"3333333",
    }
    ,    {
      id:4,
      title:"컴공으로 유학가기 좋은 곳(TOP 10)",
      thumbnail:"dasda",
      summary:"6번 요약글",
      ago_time:"1시간 전",
      profile_img:"dsds",
      nick_name:"유저 닉네임",
      my_url:"3333333",
    }
    ,    {
      id:5,
      title:"컴공으로 유학가기 좋은 곳(TOP 10)",
      thumbnail:"",
      summary:"6번 요약글",
      ago_time:"1시간 전",
      profile_img:"",
      nick_name:"유저 닉네임",
      my_url:"3333333",
    }
    ,    {
      id:6,
      title:"컴공으로 유학가기 좋은 곳(TOP 10)",
      thumbnail:"dasdas",
      summary:"6번 요약글",
      ago_time:"1시간 전",
      profile_img:"",
      nick_name:"유저 닉네임",
      my_url:"3333333",
    }
  ]);

  let cell: 1|2 =1;

  const size:any = useWindowSize();

  let cell_1:object[]=[];
  let cell_2:object[]=[];


  function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    // useEffect(() => {
    //   if (!isClient) {
    //     return false;
    //   }

    //   function handleResize() {
    //     setWindowSize(getSize());
    //   }

    //   window.addEventListener('resize', handleResize);
    //   return () => window.removeEventListener('resize', handleResize);
    // }, ); 

    return windowSize;

    //https://jcon.tistory.com/121
  }

  function cellCount(){
    if(size.width>1024){
      cell=2;
    }else if(size.width<=1024){
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
            url:"https://proveit.cafe24.com/api2/blog.php",
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
  console.log(cell);
  return (
    <>
    {renderState&&<div>
      <HeadInfo pageType="defalut" pagetitle="뉴블로 | 뉴블로" pagedescription="뉴블로 설명글"></HeadInfo>
      <Header></Header>
      <div style={{display:"flex",justifyContent:"center"}}>
        <div style={{display:"flex",width:"100%",justifyContent:"center"}}>
          <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
            {cell_1.map((item:any,index:any)=>(<MainContentsRender item={item} cell={"cell_1"} renderType={cell}  index={index} key={item.id}/>))}
            </div>
            {cell>=2&&<div style={{width:"100%",display:"flex",flexDirection:"column",position:"relative"}}>
            {cell_2.map((item:any,index:any)=>(<MainContentsRender item={item} cell={"cell_2"} renderType={cell} index={index} key={item.id}/>))}
            </div>}
        </div>
      </div>
    </div>}
    </>
  )
}

export default Home
