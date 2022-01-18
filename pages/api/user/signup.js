import { MongoClient } from "mongodb";
import nc from 'next-connect';
import middleware from "../../../middleware/middleware";

const signup = nc();
signup.use(middleware);
const today = new Date();

const result_data={
    code:"0000", // 0000:완료 200:이메일중복 300:블로그이름 중복
    data:{

    }
}
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';

signup.post('/api/user/signup',(req, res)=>{	
	const data = req.body;
	MongoClient.connect(MONGODB_URL, { useUnifiedTopology: true }, function (error, client) {
	if (error){
    	console.log(error);
    	return;
  	}
	const db = client.db('NewbloDB');
	db.collection('user').findOne({email:data.email},(err,result)=>{
		if(err){
			console.log(err);
			return;
		}

		if(result){
			result_data.code = "200";
			res.json(result_data);
		}else{
			db.collection('user').findOne({blogName:data.blogName},(err,result)=>{
				if(err){
					console.log(err);
					return;
				}
	
				if(result){
					result_data.code = "300";
					res.json(result_data);
				}else{
					db.collection('counter').findOne({ type:"userNum" }, function (err, counterResult){
						const currentUserNum = counterResult.totalUser;
						if(err){

						}else{
							db.collection('user').insertOne({
								_id:currentUserNum+1,
								email:data.email,
								pw:data.pw, 
								blogName:data.blogName,
								nickname:data.nickname, 
								introText:data.introText, 
								newsLetter:false, 
								following:[], 
								followers:[], 
								created_at:`${today.getFullYear()}년 ${String(today.getMonth()+1).padStart(2,'0')}월 ${String(today.getDate()).padStart(2, '0')}일`
							}, function(err, result){
								console.log(err);
								if(err){
									// console.log(err);
								}else{
									result_data.code = "0000";
									result_data.data = {
										email:data.email,
										blogName:data.blogName,
										nickname:data.nickname, 
										introText:data.introText, 
									}
									res.json(result_data);
									db.collection('counter').updateOne({type:"userNum"},{ $inc: { totalUser: 1 } }, function (error, result) {
										if(error){return console.error(error)}
										//요청된 값을 post 할 때, counter 컬렉션의 이름이 게시물 갯수인 데이터의 totalPost를 1 증가시키고, 업데이트 한다.
									})
								}
							});
						}
					})
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
  


		
export default signup;

