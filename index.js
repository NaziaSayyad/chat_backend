const express = require(`express`)
const dotenv= require("dotenv");
const cors= require('cors');
const connectDB = require('./config/db');
const userroute = require('./routes/user.route');
const { notFound, errorhandler } = require('./Middleware/errormiddleware');
const chatroute = require(`./routes/chat.route`);

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const messageRoutes = require("./routes/message.route");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended :true}))
app.use(cors());

app.get(`/` ,(req,res) => res.send(`chat Application `) );

app.use('/api/user',userroute)
app.use('/api/chat', chatroute);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorhandler);

app.listen(PORT , () => {
  console.log(`Server started on port ${PORT}`)
})