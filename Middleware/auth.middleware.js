const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
   const token =  req.headers['authorization'];
    // token = req.headers.authorization.split(" ")[1]

//   if (req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
  if(token){
    // res.send(token)
    try {
        // token = req.headers.authorization.split(" ")[1];
  
        //decodes token id
        const decoded = jwt.verify(token, process.env.SECRET);

        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
  }
//   }

  else{
    res.status(401);
    throw new Error("Not authorized, no token");
  }
}

module.exports = { protect };