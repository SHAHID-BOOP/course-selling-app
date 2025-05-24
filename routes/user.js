const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWRORD} = require("../config");

const userRouter = Router();

userRouter.post("/signup", async function(req,res) {
  const {email, password, firstName, lastName } = req.body; // adding zod validation
  // hash the password so that it is not stored in plain text
  
  // put inside try catch block
  await userModel.create({
    email: email,
    password: password,
    firstName:firstName,
    lastName: lastName
  })

  res.json({
    message: "Signed up successfully"
  })
})

userRouter.post("/signin", async function(req,res) {
  const {email, password} = req.body;
  // ideallly passsword should be hashed and then compared
  const user = await userModel.findOne({
    email: email,
    password: password
  })
  if(user){
    const token  = jwt.sign({
      id: user._id
    }, JWT_USER_PASSWRORD)

    res.json({
      token: token
    })
  }else{
    res.status(403).json({
      message: "incorrect credentials"
    })
  }

  res.json({
    message: "signed in successfully"
  })
})

userRouter.get("/purchases", function(req,res) {
  res.json({
    message: "purchases endpoint"
  })
})


module.exports = {
  userRouter: userRouter
}