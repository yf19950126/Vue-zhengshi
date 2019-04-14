// 用户注册信息表
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var StaffSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  name:{
    type:String,
    require:true
  },
  number:{
    type:String,
  },
  address:{
    type:String,
  },
  position:{
    type:String,
  },
  date:{
    type:Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Staff',StaffSchema)
