//连接MongoDB数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://admin:admin123456@localhost:27018/Zhengshi');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});
module.exports=mongoose;
