const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  chatName : { type :String, trim : true},
  users:[{
    type :mongoose.Schema.Types.ObjectId,
    ref : "User",
  }],
  latestmessage :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Messages"
  }
},
{
  timestamps: true
}
)
const chat = mongoose.model("chat", chatModel)
module.exports = chat
