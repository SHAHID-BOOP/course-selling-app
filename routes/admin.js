const {Router} = require("express")
const adminRouter = Router();
const { adminModel} = require("../db")


adminRouter.post("/signup", function(req,res) {
  res.json({
    message: "signup endpoint"
  })
});

adminRouter.post("/signin", function(req,res) {
  res.json({
    message: "signin endpoint"
  })
});

adminRouter.post("/", function(req,res) {
  res.json({
    message: "course endpoint"
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