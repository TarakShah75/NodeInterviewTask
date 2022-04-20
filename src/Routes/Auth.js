const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");

router.get("/",(req,res) =>{
    res.send("hello how are you");
});
router.post("/register" ,async (req,res) =>{
    
    try{
        const password = req.body.password;
        const cpassword =req.body.password;
        if(password===cpassword){
            
            const registerUser = new User(req.body);
            
            await registerUser.generateAuthToken();
        
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
})


module.exports = router;