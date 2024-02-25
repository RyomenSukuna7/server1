let express=require("express");
let cors=require("cors");
// let mongoose=require('mongoose');
let sl=require("./signLogin.js");

let app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// let mongooses=mongoose.connect("mongodb://127.0.0.1:27017/AItests");
// let schema=new mongoose.Schema({
//     user_input:String
// });

// app.post("/",(req,resp)=>{ 
//     try{
//         let sends=mongoose.model("sendss",schema);
//         let check=new sends(req.body);
//         let data=check.save();
//         resp.send(data);
//     }
//     catch(error){
//         console.log(error);
//     }
// })

// let sends=mongoose.model("sendss",schema);
// app.get("/api",async(req,resp)=>{ 
//     try{
        
//         let check=await sends.find();
//         resp.send(check);
//     }
//     catch(error){
//         console.log(error);
//     }
// })

app.use("/api",sl)
app.listen(9000,()=>console.log("server is on"));