import * as React from 'react';
import Link from 'next/link';
import axios from 'axios';

function DraftContentsRender({item,listGetApi}){
    const [deletState,setDeletState] =React.useState(false);
    const postDeleteApi = async()=>{
        const data = new FormData();
        data.append("id",item._id);
        try{
            await axios(
                {
                    method:"post",
                    url:`/api/post/postDelete`,
                    data
                }
            ).then((e)=>{
                if(e.data.code === "0000"){
                    listGetApi();
                }
                console.log(e);
            })
        }catch{

        }
    }

    return(
            <div className="userArticle">
                <div>
                    <div style={{
                        width:"100%",
                        justifyContent:"space-between",
                        }}>
                        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div className="userArticle__date">{item.createAt}</div>
                            <div className='draftBtnBox'  onClick={()=>{setDeletState(true)}}>
                                <div className='draftBtn__deleteIcon'></div>
                                <div className='draftBtn__text'>삭제</div>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            <Link href={`/modify/${item._id}`}>
                                <a className="userArticle__title">{item.title}</a>
                            </Link>
                            <Link href={`/modify/${item._id}`}>
                                <a className="userArticle__summary">{item.summary}</a>
                            </Link>
                        </div>
                    </div>
                </div>
                {deletState&&<div className="deletWindow">
                    <div className="deletWindow_alret">
                        <div className="deletWindow_alret_text">
                        글을 삭제하시겠습니까?<br/>
                        삭제한 글은 복구할 수 없습니다.</div>
                        <div className="deletWindow_alret_btnList">
                        <div className="deletWindow_alret_btn" onClick={()=>{setDeletState(false)}}>취소</div>
                        <div className="deletWindow_alret_btn" onClick={postDeleteApi}>삭제</div> 
                        </div>  
                    </div>  
                </div>}
            </div>
    )
}

export default DraftContentsRender;