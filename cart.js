const express=require("express");
const routerCart=express.Router();

const{CartModel}=require("./cartMoel");

routerCart.get("/",async(req,res)=>{
    const {userID}=req;
    try {
        const products=await CartModel.find({userID:userID});
        res.send({msg:"success",Data:products});
    } catch (error) {
        res.send("error");
    }
})

routerCart.post("/post",async(req,res)=>{
    const{id,title,image,description,category,price}=req.body;
    const{userID}=req;
   
    try {
       const model=await CartModel({
        id:id,
        title:title,
        image:image,
        description:description,
        category:category,
        price:price,
        userID:userID
       })

       model.save();
       res.send({msg:"Added"});
        
    } catch (error) {
        res.send({msg:"error"});
    }
})

routerCart.delete("/remove",async(req,res)=>{
    const{id}=req.params;
    try {
        await CartModel.deleteOne({id:id});
        res.send({msg:"deleted"});
    } catch (error) {
        res.send({msg:"error"});
    }
})

module.exports={
    routerCart
}