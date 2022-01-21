import { MongoClient } from "mongodb";
import nc from 'next-connect';
import middleware from "../../../middleware/middleware";

const followings = nc();
followings.use(middleware);
const today = new Date();

const result_data={
    code:"0000", // 0000:완료 200:이메일중복 300:블로그이름 중복
    data:{

    }
}
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';

followings.post('/api/userHome/followings',(req, res)=>{	
    const data = req.body;
	MongoClient.connect(MONGODB_URL, { useUnifiedTopology: false }, function (error, client) {
        if (error){
            console.log(error);
            return;
        }
        const db = client.db('NewbloDB');
        db.collection('user').findOne({blogName:data.blogName},{pw:0}, function (err, userResult){
            let following = userResult.following;
            if(err){

            }else{
                if(following.length>0){
                    db.collection('user').find({blogName:{$in:following}},{pw:false}).toArray(function (err, followResult){
                        if(err){
                        }else{
                            console.log(followResult);
                            result_data.code = "0000";
                            result_data.data.userData={
                                ...userResult,
                                following:followResult
                            }
                            delete result_data.data.userData.pw;
                            res.json(result_data);
                        }
                    })
                }else{
                    result_data.code = "0000";
                    result_data.data.userData = userResult;
                    res.json(result_data);
                }
            }
        })
    });
})

export const config = {
	api: {
	  bodyParser: false,
	},
  }
  


		
export default followings;

