var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var BusinessSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  date:{
    type:Date,
    default: Date.now
  },
  type:{
    type:String
  },
  username:{
    type:String,
    require:true
  },
  phone:{
    type:String
  },
  companyName:{
    type:String
  },
  gain:{
    type:String
  }
})
module.exports = mongoose.model('Business',BusinessSchema)
