import { MongoClient } from "mongodb";
import nc from 'next-connect';
import middleware from "../../../middleware/middleware";

const postDelete = nc();
postDelete.use(middleware);
const today = new Date();

const result_data={
    code:"0000", // 0000:완료 200:이메일중복 300:블로그이름 중복
    data:{

    }
}
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';

postDelete.post('/api/post/postDelete',(req, res)=>{	
	const data = req.body;
	MongoClient.connect(MONGODB_URL, { useUnifiedTopology: false }, function (error, client) {
	if (error){
    	console.log(error);
    	return;
  	}
	const db = client.db('NewbloDB');
    db.collection('articles').remove({_id:data.id*1}, function(err, result){
        console.log(err);
        if(err){
            // console.log(err);
        }else{
            result_data.code = "0000";
            console.log(result);
            res.json(result_data);
        }
    });
	});
});

export const config = {
	api: {
	  bodyParser: false,
	},
  }
  


		
export default postDelete;

