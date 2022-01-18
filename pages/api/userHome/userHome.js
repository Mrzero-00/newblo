import { MongoClient } from "mongodb";
import nc from 'next-connect';
import middleware from "../../../middleware/middleware";

const userHome = nc();
userHome.use(middleware);
const today = new Date();

const result_data={
    code:"0000", // 0000:완료 200:이메일중복 300:블로그이름 중복
    data:{

    }
}
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';

userHome.post('/api/userHome/userHome',(req, res)=>{	
    const data = req.body;
	MongoClient.connect(MONGODB_URL, { useUnifiedTopology: true }, function (error, client) {
	if (error){
    	console.log(error);
    	return;
  	}
	const db = client.db('NewbloDB');
    db.collection('articles').find({ blogName:data.blogName }).toArray(function (err, result){
        if(err){

        }else{
            console.log(result);
            result_data.data.postData = result;
            db.collection('user').findOne({ blogName:data.blogName }, function (err, result){
                console.log(result);
                if(err){

                }else{
                    result_data.code = "0000";
                    result_data.data.userData = result;
                    res.json(result_data);
                }
            })
        }
    })
	
	});
});

export const config = {
	api: {
	  bodyParser: false,
	},
  }
  


		
export default userHome;

