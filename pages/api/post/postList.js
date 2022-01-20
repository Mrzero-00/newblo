import { MongoClient } from "mongodb";
import nc from 'next-connect';
import middleware from "../../../middleware/middleware";

const postList = nc();
postList.use(middleware);
const today = new Date();

const result_data={
    code:"0000", // 0000:완료 200:이메일중복 300:블로그이름 중복
    data:{

    }
}
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';
postList.post('/api/post/postList',(req, res)=>{	
    const data = req.body;
    //console.log(data);
	MongoClient.connect(MONGODB_URL, { useUnifiedTopology: false }, function (error, client) {
	if (error){
    	console.log(error);
    	return;
  	}
	const db = client.db('NewbloDB');
    if(data.type ==="draft"){
      db.collection('articles').find({type:"draft",blogName:data.blogName}).limit(20*data.page).toArray((err,result)=>{
        console.log(typeof(20*data.page));
        result_data.data = result;
        res.json(result_data);
      });
    }else{
      db.collection('articles').find({type:"save"}).limit(20*data.page).toArray((err,result)=>{
          console.log(typeof(20*data.page));
          result_data.data = result;
          res.json(result_data);
      });
    }
    });
})

export const config = {
	api: {
	  bodyParser: false,
	},
  }
  


		
export default postList;

