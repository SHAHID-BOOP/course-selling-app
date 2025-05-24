const mongoose = require("mongoose");
console.log("Connected to")
mongoose.connect("mongodb+srv://mohdshahida891:oVaYRfyBFqdfX58O@cluster0.kzl8h2j.mongodb.net/coursera-app")

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, uniique: true},
  password: String,
  firstName: String,
  lastName: String
});

const adminSchema = new Schema({
  email: { type: String, uniique: true},
  password: String,
  firstName: String,
  lastName: String
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId
});

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseID: ObjectId,
  
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModal = mongoose.model("course", courseSchema);
const purchaseModal = mongoose.model("purchase", purchaseSchema); 

module.exports = {
  userModel,
  adminModel,
  courseModal,
  purchaseModal
}