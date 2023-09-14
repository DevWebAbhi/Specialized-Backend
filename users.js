const express=require("express");

const routerUser=express.Router();

const {UserModel} =require("./userModel");

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

require("dotenv").config();

const JWTKEY=process.env.JWTKEY;


routerUser.post("/signup",async(req,res)=>{
const{name,email,password}=req.body;
if(password.length<4){
    res.send({msg:"Enter valid password"});
    return;
}
if(typeof email=="string" && email.length>5 && typeof name =="string" && name.length>0 && typeof password=="string"){
    const user=await UserModel.findOne({email:email});
    if(user){
        res.send({msg:"You are already a existing user"});
        return;
    }
   const status= await signup(name,email,password);
    const candidate=await UserModel.findOne({email:email});
   const tokens=await token(candidate._id);
    if(tokens=="error"){
        res.send({msg:"error"});
        return;
    }
   res.send({msg:status,name:candidate.name,token:tokens});
}else{
    res.send({msg:"error"});
}
})



routerUser.post("/login",async(req,res)=>{

      const{email,password}=req.body;
        try {
            const user=await UserModel.findOne({email:email});
            if(user){
                    const check= await loginEncrypt(password,user.password);
                    if(check==true){
                    const code= await token(user._id);
                    if(code!="error"){
                        res.send({msg:"Successfull",token:code});
                    }else{
                        res.send({msg:"error"});
                    }
                    }else if(check==false){
                        res.send({msg:"Not exist"});
                    }else{
                        res.send({msg:"error"});
                    }
            }else{
                res.send({msg:"Not a Existing User"});
            }
        } catch (error) {
            res.send({msg:"error"});
        }


})

async function loginEncrypt(...a){
    const[password,hashed]=a;
    try {
       
        const compare=await bcrypt.compareSync(password, hashed);
        return compare;
    } catch (error) {
        return "error";
    }
}



async function token(userID){
    try {
        const token =await jwt.sign({ userID:userID }, JWTKEY);
        return token;
    } catch (error) {
        return "error";
    }
}





async function signup(...a){
    const[name,email,password]=a;
    try {
        const hash=await hashcode(password);
        if(hash!="error"){
            console.log(hash,"hash")
           const user=await UserModel({
            name:name,email:email,password:hash
           });
           user.save();
           return "Successfull";
        }else{
            return "error"; 
        }
    } catch (error) {
        return "error";
    }
}


async function hashcode(...a){
    const[password]=a;
   
   try {
    const salt =await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
          
            return hash;
       
  
   } catch (error) {
    return "error";
   }
}

module.exports={
    routerUser
};