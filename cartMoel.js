const mongoose=require("mongoose");


const cartSchema=mongoose.Schema({
    id: {type:String,reqired:true},
title: {type:String,reqired:true},
image: {type:String,reqired:true},
description: {type:String,reqired:true},
category:{type:String,reqired:true},
price: {type:Number,reqired:true},
userID:{type:String,reqired:true}
});

const CartModel=mongoose.model("cart",cartSchema);

module.exports={
    CartModel
}