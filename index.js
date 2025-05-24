const express = require("express");
const mongoose = require("mongoose")

const {  courseRouter } = require("./routes/course");
const {  userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


async function main() {
  await mongoose.connect("mongodb+srv://mohdshahida891:oVaYRfyBFqdfX58O@cluster0.kzl8h2j.mongodb.net/coursera-app")
  app.listen(3000);
  console.log("Server is running on port 3000"); 
}

main()
