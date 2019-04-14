// 用户注册信息表
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var OutputMachineSchema = new Schema({
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
  motorMoney:{
    type:String
  },
  motorNumber:{
    type:String,
  },
})
module.exports = mongoose.model('OutputMachine',OutputMachineSchema)
