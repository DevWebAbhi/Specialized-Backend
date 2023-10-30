const express=require("express");
const app=express();
app.use(express.json());
const{connect} =require("./db");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const {routerUser} =require("./users");
const{routerProduct}=require("./products")
const PORT=process.env.PORT;
const{routerCart}=require("./cart");
const { UserModel } = require("./userModel");
const JWTKEY=process.env.JWTKEY;
app.use(cors());
app.get("/",(req,res)=>{
    res.send({msg:"Welcome To Specliazed Backend"});
})

app.use('/Files', express.static(__dirname + '/Files'));
async function auth(req,res,next){
    const token=req.headers.authorization.split(" ")[1];
    console.log(JWTKEY,token)
    try {
        const decoded = await jwt.verify(token, JWTKEY);
         const model=await UserModel.findOne({_id:decoded.userID});
         if(model){
            req.userID=decoded.userID;
            next();
         }else{
            res.send({msg:"unauthorized"});
         }
    } catch (error) {
        res.send({msg:"unauthorized"});
    }
}
app.use("/account",routerUser);


app.use("/products",routerProduct);


app.use("/cart",auth,routerCart);


//wrong wndpoints handelers
app.get("*",(req,res)=>{
    res.send({msg:"Endpoint Not Exist"});
})

app.post("*",(req,res)=>{
    res.send({msg:"Endpoint Not Exist"});
})

app.patch("*",(req,res)=>{
    res.send({msg:"Endpoint Not Exist"});
})


app.put("*",(req,res)=>{
    res.send({msg:"Endpoint Not Exist"});

});
app.delete("*",(req,res)=>{
    res.send({msg:"Endpoint Not Exist"});
})


app.head("*",(req,res)=>{
    res.send({msg:"Endpoint Not Exist"});
})

app.options("*",(req,res)=>{
    res.send({msg:"Endpoint Not Exist"});
})


app.listen(PORT,async()=>{
    try {
        await connect;
        console.log("Server Connected");
    } catch (error) {
        console.log(error)
    }
})