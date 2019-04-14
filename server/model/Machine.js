// 用户注册信息表
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var MachineSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  date:{
    type:Date,
    default:Date.now
  },
  people:{
    type:String,
  },
  motorName:{
    type:String,
    require:true
  },
  motorAddress:{
    type:String,
  },
  motorWork:{
    type:String,
  },
  motorMoney:{
    type:String
  },
  motorNumber:{
    type:String,
  },
})
module.exports = mongoose.model('Machine',MachineSchema)
