const Chat = require("../models/chat.model");
const User = require("../models/userModel");

const acesschat = async(req,res) =>{
    const {userId} = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
      }
    //   else{
    //     res.send(req.user);
    //   }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestmessage");
    
      isChat = await User.populate(isChat, {
        path: "latestmessage.sender",
        select: "name pic email",
      });
    
      if (isChat.length > 0) {
        res.send(isChat[0]);
      } else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
    
        try {
          const createdChat = await Chat.create(chatData);
          const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
          );
          res.status(200).json(FullChat);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
      }
}
const fetchchat = async (req,res) =>{
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
          .populate("users", "-password")
          .populate("latestmessage")
          .sort({ updatedAt: -1 })
          .then(async (results) => {
            results = await User.populate(results, {
                path: "latestmessage.sender",
                select: "name pic email",
              });
            res.status(200).send(results);
          });
        // .then((result) => res.status(200).send(result));
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
}

module.exports = {acesschat, fetchchat};