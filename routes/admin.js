const {Router} = require("express")
const adminRouter = Router();
const { adminModel} = require("../db")

const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config")
const {adminMiddleware} = require("../middleware/admin")

adminRouter.post("/signup", async function(req,res) {
  const {email, password, firstName, lastName } = req.body; // adding zod validation
    // hash the password so that it is not stored in plain text
    
    // put inside try catch block
  await adminModel.create({
    email: email,
    password: password,
    firstName:firstName,
    lastName: lastName
  })

  res.json({
    message: "admin signing up successfully"
  })
});

adminRouter.post("/signin", async function(req,res) {
  const {email, password} = req.body;
    // ideallly passsword should be hashed and then compared
  const admin = await adminModel.findOne({
    email: email,
    password: password
  })
  if(admin){
    const token  = jwt.sign({
      id: admin._id
    }, JWT_ADMIN_PASSWORD)
  
    res.json({
      token: token
    })
  }else{
    res.status(403).json({
      message: "incorrect credentials"
    })
  }
});

adminRouter.post("/course", adminMiddleware, async function(req,res) {
  const adminId = req.userId;

  const { title,description, imageUrl,price, creatorId } = req.body;

  const course = await adminModel.create({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    creatorId: adminId
  })

  res.json({
    message: "course created",
    courseId: course._id
  })
});

adminRouter.put("/", function(req,res) {
  

  res.json({
    message: "course endpoint"
  })
});

adminRouter.get("/bulk", function(req,res) {
  res.json({
    message: "course endpoint"
  })
});

module.exports = {
  adminRouter: adminRouter
}