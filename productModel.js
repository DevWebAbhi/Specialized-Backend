const mongoose=require("mongoose");


const productSchema=mongoose.Schema({
    id: {type:Number,reqired:true},
title: {type:String,reqired:true},
image: {type:String,reqired:true},
description: {type:String,reqired:true},
category:{type:String,reqired:true},
price: {type:Number,reqired:true}
});

const ProductModel=mongoose.model("products",productSchema);

module.exports={
    ProductModel
}