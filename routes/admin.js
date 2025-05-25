const {Router} = require("express")
const adminRouter = Router();
const { adminModel, courseModal} = require("../db")

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

  const { title,description, imageUrl,price } = req.body;

  const course = await courseModal.create({
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

adminRouter.put("/course", adminMiddleware,  async function(req,res) {
  const adminId = req.userId;

  const { title,description, imageUrl,price, courseId } = req.body;

  const course = await courseModal.updateOne({
    _id: courseId,
    creatorId: adminId
  }, {
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl
  })

  res.json({
    message: "course updated",
    courseId: course._id
  })

});

adminRouter.get("/course/bulk", adminMiddleware,  function(req,res) {
  const adminId = req.userId;

  const courses = courseModal.find({
    creatorId: adminId
  });


  res.json({
    message: "course updated",
    courses
  })
});

module.exports = {
  adminRouter: adminRouter
}