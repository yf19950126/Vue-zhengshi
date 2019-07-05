// 用户注册信息表
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  orderId:{
    type:String,
  },
  date:{
    type:Date,
    default:Date.now
  },
  companyName:{
    type:String,
  },
  motorId:{
    type:String,
    require:true
  },
  reason:{
    type:String,
  },
  number:{
    type:String,
  },
  status:{
    type:String,
  },
  SendDate:{
    type:String,
  },
})
module.exports = mongoose.model('Order',OrderSchema)
