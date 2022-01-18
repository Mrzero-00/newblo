import { MongoClient } from "mongodb";
import nc from 'next-connect';
import middleware from "../../../middleware/middleware";

const postGet = nc();
postGet.use(middleware);
const today = new Date();

const result_data={
    code:"0000", // 0000:완료 200:이메일중복 300:블로그이름 중복
    data:{

    }
}
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';

postGet.post('/api/post/postGet',(req, res)=>{	
    const data = req.body;
	MongoClient.connect(MONGODB_URL, { useUnifiedTopology: true }, function (error, client) {
	if (error){
    	console.log(error);
    	return;
  	}
	const db = client.db('NewbloDB');
    db.collection('articles').findOne({ _id:data.postId*1 }, function (err, result){
        if(err){

        }else{
            result_data.code = "0000";
            result_data.data.postData = result;
            res.json(result_data);
        }
    })
	
	});
});

export const config = {
	api: {
	  bodyParser: false,
	},
  }
  


		
export default postGet;

