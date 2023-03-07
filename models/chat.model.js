const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  chatName : { type :String, trim : true},
  isgroup :{type :Boolean, default : false},
  users:[{
    type :mongoose.Schema.Types.ObjectId,
    ref : "User",
  }],
  latestmessage :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Messages"
  },
  groupAdmin :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  }
},
{
  timestamps: true
}
)
const chat = mongoose.model("chat", chatModel)
module.exports = chat
