import nc from "next-connect";
import { MongoClient } from "mongodb";
import middleware from "../../../middleware/middleware";

const login = nc();
const result_data={
    code:"0000", // 0000완료
    data:{

    }
}

login.use(middleware);
const MONGODB_URL = 'mongodb+srv://newbloTeam:dlfdlfrhdrhddydapdlf@cluster0.isbgk.mongodb.net/NewbloDB?retryWrites=true&w=majority';

login.post("/api/user/login",(req,res)=>{
    const data = req.body;
    MongoClient.connect(MONGODB_URL, { useUnifiedTopology: false }, function (error, client) {
        if(error){
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
                db.collection('user').findOne({email:data.email,pw:data.pw},(err,result)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
        
                    if(result){
                        result_data.data = result;
                        res.json(result_data);
                    }else{
                        res.json("비밀번호 확인");
                    }
                })
            }else{
                res.json("아이디 확인");
            }
        })
    })
})

export const config = {
	api: {
	  bodyParser: false,
	},
}

export default login;