const mongoose = require('mongoose');

const messageschema = mongoose.Schema({
       sender :
       {type : mongoose.Schema.Types.ObjectId,ref : "User"},
        content : {type : String},
        chat : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"chat"
        },
        readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

     },
     {
        timestamps :true
     }
);
const Message = mongoose.model("Messages", messageschema);

module.exports = Message;

