const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("json-web-token");
const { cookie } = require("express/lib/response");

router.get("/",(req,res) =>{
    res.send("hello how are you");
});
router.post("/register" ,async (req,res) =>{
    
    try{
        const password = req.body.password;
        const cpassword =req.body.password;
        if(password===cpassword){
            
            const registerUser = new User(req.body);
            console.log("the success part "+registerUser);
            
            // const token = await registerUser.generateAuthToken();
            // console.log("the token part"+token);
            // res.cookie("jwt",token,{
            //     expires:new Date(date.now()+24*60*60*1000),
            //     httpOnly:true
            // });
            // console.log(cookie)
            
        
        const registered = await registerUser.save();
        res.status(201).send(registered);
        }else{
            res.status(400).send("password are not match");
        }
        
            }catch(error){
                res.status(500).send(error);
            }

});
router.post("/login", async(req,res) =>{
         const email = req.body.email;
         const password = req.body.password;
    try{
         
         const userEmail =await User.findOne({email:email});
         const isMatch =await bcrypt.compare(password,userEmail.password);
         console.log(isMatch);
         if(isMatch){
             res.send("user verify")
         }else{
             res.status(400).send("incorrect password");
         }
    }catch(error){
          res.status(500).send(error);
    }
});
router.post("/changepassword",async(req,res) =>{
    try{
         const userEmail = req.body.email;
         const _id = req.params.id;
         if(email === userEmail){
             sendResetLink(userEmail.email,_id);
         }else{
             console.log("Please enter appropriate email");
         }
    }catch(error){
        res.status(500).send(error);
    }
});
router.post("/logout", async(req,res) =>{
    try{
        await logout.User();
    }catch(error){
          res.status(500).send(error);
    }
})


module.exports = router;