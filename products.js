const express=require("express");

const routerProduct=express.Router();

const{ProductModel}=require("./productModel");

routerProduct.get("/",async(req,res)=>{
    const{title,sort,sortDate_type,filter,page}=req.query;
        console.log(title,sortDate_type,filter,page)
    try {
            if(title && sortDate_type && filter && page && sort){
                console.log(1);
                const model=await ProductModel.find({title:title,Category:filter}).skip(8*page).limit(8).sort({[sort]:sortDate_type==1?1:-1});
                res.send({token:"Done",Data:model});
            }else if(title && sortDate_type && filter && sort){
                const model=await ProductModel.find({title:title,Category:filter}).limit(8).sort({[sort]:sortDate_type==1?1:-1});
                res.send({token:"Done",Data:model});
            }else if(title && sortDate_type && sort){
                const model=await ProductModel.find({title:title}).limit(8).sort({[sort]:sortDate_type==1?1:-1});
                res.send({token:"Done1",Data:model});
            }else if(title && filter){
                const model=await ProductModel.find({title:title,Category:filter}).limit(8);
                res.send({token:"Done",Data:model});
            }else if(sortDate_type && filter && sort){
                const model=await ProductModel.find({category:filter}).limit(8).sort({[sort]:sortDate_type==1?1:-1});
                res.send({token:"Done1",Data:model});
            }else if(sortDate_type && page && sort){
                const model=await ProductModel.find({title:title}).skip(8*page).limit(8).sort({[sort]:sortDate_type==1?1:-1});
                res.send({token:"Done",Data:model});
            }else if(sortDate_type && page && sort && page){
                const model=await ProductModel.find({title:title}).skip(8*page).limit(8).sort({[sort]:sortDate_type==1?1:-1});
                res.send({token:"Done",Data:model});
            }
            else if(title){
                const model=await ProductModel.find({title:title}).limit(8);
                res.send({token:"Done",Data:model});
            }else if(filter){
                const model=await ProductModel.find({Category:filter}).limit(8);
                res.send({token:"Done",Data:model});
            }else if(page){
                const model=await ProductModel.find().skip(8*page).limit(8);
                res.send({token:"Done",Data:model});
            }else if(sortDate_type && sort){
                const model=await ProductModel.find().limit(8).sort({[sort]:sortDate_type==1?1:-1});
                res.send({token:"Done",Data:model});
            }else{
                const model=await ProductModel.find().limit(8);
                res.send({token:"Done",Data:model});
            }

       
    } catch (error) {
        console.log(error);
        res.send({msg:"Error occured",token:"NOT"});
    }
})


routerProduct.get("/singleproduct/:id",async(req,res)=>{
    const{id}=req.params;
    try {
        const modell= await ProductModel.findOne({id:id});
        const model=await modell;
        console.log(model)
        if(model==null){
            res.send({msg:"No Product"});
            return;
        }
        res.send({msg:"successful",Data:model});
    } catch (error) {
        res.send({msg:"error"});
    }

})
module.exports={
    routerProduct
}
