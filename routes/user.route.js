 const express = require(`express`);
const {registeruser, authuser, alluser} = require("../controllers/userController");
const { protect } = require("../Middleware/auth.middleware");

const Router = express.Router();

Router.route("/").get(protect, alluser);
Router.post('/login',authuser);
Router.post('/', registeruser);


module.exports = Router;

