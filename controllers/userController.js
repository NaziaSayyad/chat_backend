const generateToken = require("../config/generatetoken");
const User = require("../models/userModel");

const registeruser = async (req,res) =>{
 const {name, email, password, image } = req.body;

 if (!name || !email || !password) {
  res.status(400).send("Please Enter all the Feilds");
}
const userExists = await User.findOne({ email });

if (userExists) {
  res.status(400).send("User already exists");
}
const user = await User.create({
  name,
  email,
  password,
  image,
});

if (user) {
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    image : user.image,
    token: generateToken(user._id),
  });
} else {
  res.status(400).send("User not found");
}

  
}
const authuser = async(req,res) =>{
  const {email, password} = req.body;
  
const user = await User.findOne({email});

if (user && user.password === password) {
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    pic: user.pic,
    token: generateToken(user._id),
  });
} 
else {
  res.status(401).send("Invalid Email or Password");
}
}

const alluser = async (req,res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
}
module.exports = { registeruser, authuser, alluser };
