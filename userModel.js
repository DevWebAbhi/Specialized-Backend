const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,reqired:true},
    email:{type:String,reqired:true},
    password:{type:String,reqired:true}
});

const UserModel=mongoose.model("users",userSchema);

module.exports={
    UserModel
}