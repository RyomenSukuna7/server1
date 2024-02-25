let express=require("express");
let cors=require("cors");
let mongoose=require("mongoose");
let nodemailer=require("nodemailer");
require('dotenv').config();

let app=express.Router();
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());

let mongooses=mongoose.connect(process.env.MONGO_CONNECTION);
let schemaa=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})




let transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL_NAME,
        pass:process.env.GMAIL
    }
})
   

//this is the data to send on the server
app.post("/send",async (req,resp)=>{

    try{

        let data=await fetch("http://localhost:9000/api/come");
        let result=await data.json();
        
        let check=false;
        result.map((datas)=>{
            if((datas.email==req.body.email)){
                check=true;
            }

        });

        if(check){
            console.log("It is a error");
        }
        else{
                
                    let otp=req.body.otp;
                    let email=req.body.email;
                    let messages={
                        to:email,
                        from:process.env.GMAIL_NAME,
                        subject:"otp",
                        text:otp.toString()
                    }
                    
    
                    transport.sendMail(messages,(error,info)=>{
                        if(error) console.log(error);
                        else console.log(info.response);
                    })
                    let models=mongoose.model("AIsignlogins",schemaa);
                    let user_info=new models(req.body);
                    let saves=user_info.save();
                    resp.send(saves);
                
            }
            
        }

    catch(error){
        console.log(error)
    }
    
})

//this is the api which is coming from the server
let models=mongoose.model("AIsignlogins",schemaa);
app.get("/come",async (req,resp)=>{
    try{
        let data=await models.find();
        resp.send(data);
    }
    catch(error){
        console.log(error);
    }
})

module.exports=app;