const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("json-web-token");

const userSchema = new mongoose.Schema({
     name :{
         type:String,
         trim:true,
         minlength:5,
         maxlength:50
     },
     email:{
         type:String,
         trim:true,
         lowercase:true,
         validate(value){
             if(!validator.isEmail(value)){
                 throw new Error("Invalid Email");
             }
         }
     },
     address:{
         type:String,
         trim:true

     },
     gender :{
         type:String,
         trim:true
     },
     age:{
         type:Number,
         trim:true
         
     },
     phone:{
         type:Number
     },
     password:{
         type:String,
         trim:true
     },
     tokens:[{
         token:{
            type:String
         }
         
     }]

});
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
               console.log(`the current password is ${this.password}`);
               this.password = await bcrypt.hash(this.password,10);
               this.cpassword = await bcrypt.hash(this.password,10);
               console.log(`the bcrypt password is ${this.password}`);
    }
    next();
});
userSchema.methods.generateAuthToken = async function(){
    try{
           console.log(this._id);
           const tokenA = jwt.sign({_id:this._id},"amitupadhyayisfromambajiandlivinginahmedabad");
           this.tokens =this.tokens.concat({token:tokenA});
           await this.save();
           return tokenA;
    }catch(error){
           res.send(error);
    }
   };


const User = new mongoose.model("User",userSchema);

module.exports=User;