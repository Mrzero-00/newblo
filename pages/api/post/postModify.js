import { MongoClient } from "mongodb";
import nc from 'next-connect';
import middleware from "../../../middleware/middleware";

const postModify = nc();
postModify.use(middleware);
const today = new Date();

const result_data={
    code:"0000", // 0000:완료 200:이메일중복 300:블로그이름 중복
    data:{

    }
}
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';

postModify.post('/api/post/postModify',(req, res)=>{	
    const data = req.body;
    MongoClient.connect(MONGODB_URL, { useUnifiedTopology: false }, function (error, client) {
        if (error){
            console.log(error);
            return;
          }
        const db = client.db('NewbloDB');
        if(data.type==="save"){
            db.collection('user').findOne({ blogName:data.blogName }, function (err, userResult){
                if(err){

                }else{
                    db.collection('articles').updateOne({_id:data.id*1},{
                        $set:{
                        type:"save",
                        title:data.title,
                        summary:data.summary,
                        thumbnail:data.thumbnail,
                        mainText:data.mainText,
                        author:userResult,
                        createAt:`${today.getFullYear()}년 ${String(today.getMonth()+1).padStart(2,'0')}월 ${String(today.getDate()).padStart(2, '0')}일`
                    }}, function(err, result){
                        console.log(err);
                        if(err){
                            // console.log(err);
                        }else{
                            result_data.code = "0000";
                            result_data.data = {
                                articlesUrl:`/${data.blogName}/${data.id*1}`
                            }
                            res.json(result_data);
                        }
                    });
            }})
        
        }else if(data.type==="draft"){    
            db.collection('articles').updateOne({_id:data.id*1},{
                $set:{
                title:data.title,
                summary:data.summary,
                thumbnail:data.thumbnail,
                mainText:data.mainText,        
            }}, function(err, result){
                console.log(err);
                if(err){
                    console.log(err);
                }else{
                    result_data.code = "0000";
                    res.json(result_data);
                }
            });             
        }else{    
            db.collection('articles').findOne({_id:data.id*1},function(err, result){
                console.log(err);
                if(err){
                    console.log(err);
                }else{
                    result_data.code = "0000";
                    result_data.data = result;
                    console.log(result);
                    res.json(result_data);
                }
            });             
        }
        })
        
});

export const config = {
	api: {
	  bodyParser: false,
	},
  }
  


		
export default postModify;

