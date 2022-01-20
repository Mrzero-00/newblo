import { MongoClient } from "mongodb";
import nc from 'next-connect';
import middleware from "../../../middleware/middleware";

const subsribe = nc();
subsribe.use(middleware);
const today = new Date();

const result_data={
    code:"0000", // 0000:완료 200:이메일중복 300:블로그이름 중복
    data:{

    }
}
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';

subsribe.post('/api/user/subsribe',(req, res)=>{	
	const data = req.body;
	MongoClient.connect(MONGODB_URL, { useUnifiedTopology: false }, function (error, client) {
	if (error){
    	console.log(error);
    	return;
  	}
	const db = client.db('NewbloDB');
    if(data.type === "subsribe"){
        db.collection('user').updateOne({blogName:data.myBlogName},{
            $push:{
                following:data.yourBlogName
            }
        },(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            db.collection('user').updateOne({blogName:data.yourBlogName},{
                $push:{
                    followers:data.myBlogName
                }
            },(err,result)=>{
                if(err){
                    console.log(err);
                    return;
                }
                result_data.data = "구독";
                res.json(result_data);
            })
        })
    }else{
        db.collection('user').updateOne({blogName:data.myBlogName},{
            $pull:{
                following:data.yourBlogName
            }
        },(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            db.collection('user').updateOne({blogName:data.yourBlogName},{
                $pull:{
                    followers:data.myBlogName
                }
            },(err,result)=>{
                if(err){
                    console.log(err);
                    return;
                }
                result_data.data = "구독해제";
                res.json(result_data);
            })
        })
    }

    
	
	});
});

export const config = {
	api: {
	  bodyParser: false,
	},
  }
  


		
export default subsribe;

