var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
  _id:{
    type:String,
    default:shortid.generate
  },
  date:{
    type:Date,
    default: Date.now
  },
  address:{
    type:String
  },
  username:{
    type:String,
    require:true
  },
  phone:{
    type:String
  },
  gain:{
    type:String
  }
})
module.exports = mongoose.model('Product',ProductSchema)
