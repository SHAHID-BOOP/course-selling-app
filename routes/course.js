const {Router} = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModal, courseModal } = require("../db");
const courseRouter = Router();
 

courseRouter.post("/purchases", userMiddleware, async  function(req,res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModal.create({
    userId,
    courseId
  })

  res.json({
    message: "You have successfully bought the course"
  })
})

courseRouter.get("/preview",async  function(req,res) {
  const courses = await courseModal.find({})
  
  res.json({
    courses
  })
})

module.exports = {
  courseRouter: courseRouter
}