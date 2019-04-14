const express = require('express');
// var multer = require('multer');
const app = express();
//连接数据库的文件
const db = require('../model/db');
const router = express.Router();
//管理员信息表
const User = require('../model/User')
//添加生产信息表
const Product = require('../model/Product')
//添加商务信息信息表
const Business = require('../model/Business')
//入库电机信息表
const Machine = require('../model/Machine')
//出库电机信息表
const OutputMachine = require('../model/OutputMachine')
//添加订单信息表
const Order = require('../model/Order')
//职工信息表
const Staff = require('../model/Staff')
// 登录
// 设置登录session
router.post('/login',(req,res)=>{
  console.log(req.body)
  let name = req.body.name;
  let pass = req.body.pass;
  User.findOne({name}).then(user=>{
    if(user){
      if(pass === user.pass){
        res.cookie('name',name,{
          maxAge: 7*24*3600*1000
        })
        return res.status(200).json({
          status: 1,
          msg: "登录成功"
        });
      }else if(pass !== user.pass){
        return res.json({
          status: 0,
          msg: "密码错误"
        });
      }
    }else if(!user){
      return res.json({
        status:0,
        msg:'不好意思，查无此用户！'
      })
    }else{
      return res.json({
        status:0,
        msg:'您的账号或者密码有误！'
      })
    }
  })
})

//判断cookie
router.post('/cookie',function (req,res) {
  // console.log(req.cookies.name);
  res.send({code:1,data:req.cookies.name});

})

//登出接口
router.post("/logout", function (req,res) {
  console.log(req.cookies.name)
  res.cookie("name","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});

//添加生产信息
router.post('/addProduct',function (req,res,next) {
  var newProduct = new Product();
  newProduct.date = req.body.date;
  newProduct.address = req.body.address;
  newProduct.username = req.body.username;
  newProduct.phone = req.body.phone;
  newProduct.gain = req.body.gain;
  console.log(req.body);
  newProduct.save().then(data=>{
    return res.json({
      status:'0',
      message:"success"
    })
  }).catch(err=>{
    return res.json({
      status:'1',
      message:err
    })
  })
})

//获取生产信息列表
router.get('/productList',function (req,res,next) {
  var page = parseInt(req.query.page);
  var pageSize = parseInt(req.query.pageSize);
  var skip = parseInt((page - 1) * pageSize);
  Product.find({}).sort({'date':-1}).skip(skip).limit(pageSize).exec().then(product=>{
    if(product){
      Product.count({},function (err,count) {
        return res.json({
          status:'0',
          ProductList:product,
          count:count
        })
      })
    }
  }).catch(err=>{
    return res.json({
      status:'1',
      message:err
    })
  })
})

//添加商务信息出勤单
router.post('/addBusiness',function (req,res,next) {
  var newBusiness = new Business();
  newBusiness.date = req.body.date;
  newBusiness.type = req.body.type;
  newBusiness.username = req.body.username;
  newBusiness.phone = req.body.phone;
  newBusiness.companyName = req.body.companyName;
  newBusiness.gain = req.body.gain;
  console.log(req.body);
  newBusiness.save().then(data=>{
    return res.json({
      status:'0',
      message:"success"
    })
  }).catch(err=>{
    return res.json({
      status:'1',
      message:err
    })
  })
})

//获取出勤列表
router.get('/businessList',function (req,res,next) {
  var page = parseInt(req.query.page);
  var pageSize = parseInt(req.query.pageSize);
  var skip = parseInt((page - 1) * pageSize);
  Business.find({}).sort({'date':-1}).skip(skip).limit(pageSize).exec().then(business=>{
    if(business){
      Business.count({},function (err,count) {
        return res.json({
          status:'0',
          BusinessList:business,
          count:count
        })
      })
    }
  }).catch(err=>{
    return res.json({
      status:'1',
      message:err
    })
  })
})

///入库电机配件
router.post('/addMachine',function(req,res,next){
  var newMachine = new Machine();
  newMachine.people = req.body.people;
  newMachine.motorName = req.body.motorName;
  newMachine.motorAddress = req.body.motorAddress;
  newMachine.motorWork = req.body.motorWork;
  newMachine.motorMoney = req.body.motorMoney;
  newMachine.motorNumber = req.body.motorNumber;
  console.log(req.body);
    newMachine.save().then(data=>{
        return res.json({
          status:'0',
          message:"success"
        })
      }).catch(err=>{
        return res.json({
          status:'1',
          message:err
        })
      })
  })

// 获取入库配件列表
router.get('/machineList',function (req,res) {
  const page = parseInt(req.query.page);
  //console.log(page)
  const pageSize = parseInt(req.query.pageSize);
  const skip = parseInt((page - 1) * pageSize);
  Machine.find({}).sort({'date':-1}).skip(skip).limit(pageSize).exec().then(machines=>{
    if(machines){
      Machine.count({},function(err,count){
        return res.json({
          status:'0',
          machineList:machines,
          count:count,
        })
      })
    }
  }).catch(err=>{
    console.log(err)
  })
})

//出库电机配件
router.post('/addOutputMachine',function(req,res,next){
  var newOutputMachine = new OutputMachine();
  newOutputMachine.date = req.body.date;
  newOutputMachine.people = req.body.people;
  newOutputMachine.motorName = req.body.motorName;
  newOutputMachine.motorAddress = req.body.motorAddress;
  newOutputMachine.motorMoney = req.body.motorMoney;
  newOutputMachine.motorNumber = req.body.motorNumber;
  console.log(req.body);
  newOutputMachine.save().then(data=>{
    return res.json({
      status:'0',
      message:"success"
    })
  }).catch(err=>{
    return res.json({
      status:'1',
      message:err
    })
  })
})

// 获取出库配件列表
router.get('/outputMachineList',function (req,res) {
  const page = parseInt(req.query.page);
  //console.log(page)
  const pageSize = parseInt(req.query.pageSize);
  const skip = parseInt((page - 1) * pageSize);
  OutputMachine.find({}).sort({'date':-1}).skip(skip).limit(pageSize).exec().then(outputmMachines=>{
    if(outputmMachines){
      OutputMachine.count({},function(err,count){
        return res.json({
          status:'0',
          outputMachineList:outputmMachines,
          count:count,
        })
      })
    }
  }).catch(err=>{
    console.log(err)
  })
})

//添加订单
router.post('/addOrder',function(req,res,next){
  var newOrder = new Order();
  newOrder.orderId = req.body.orderId;
  newOrder.date = req.body.date;
  newOrder.companyName = req.body.companyName;
  newOrder.motorId = req.body.motorId;
  newOrder.reason = req.body.reason;
  newOrder.number = req.body.number;
  newOrder.status = req.body.status;
  console.log(req.body);
  newOrder.save().then(data=>{
    return res.json({
      status:'0',
      message:"success"
    })
  }).catch(err=>{
    return res.json({
      status:'1',
      message:err
    })
  })
})

//订单列表
router.get('/orderList',function (req,res) {
  //console.log(page)
  Order.find({}).sort({'date':-1}).then(orders=>{
    if(orders){
        return res.json({
          status:'0',
          orderLists:orders,
      })
    }
  }).catch(err=>{
    console.log(err)
  })
})

// 修改订单状态
router.post('/updateStatus',function(req,res,next){
  Order.findOne({'companyName':req.body.companyName,'motorID':req.body.motorID,'reason':req.body.reason,
    'number':req.body.number}).then(order=>{
    order.status = req.body.status;
    order.save().then(data=> {
      return res.json({
        status:'0',
        message:'success'
      })
    }).catch(err=>{
      return res.json({
        status:'1',
        message:err
      });
    })
  })

})

//员工注册
router.post('/register',function(req,res,next){
  var newStaff = new Staff();
  newStaff.name = req.body.name;
  newStaff.number = req.body.number;
  newStaff.address = req.body.address;
  newStaff.position = req.body.position;
  newStaff.date = req.body.date;
  console.log(req.body);
  //判断一下如果，数据库单中存在相同的username,让用户重新填写
  Staff.findOne({'name':req.body.name},function(err,staff){
    if(staff){
      return res.json({
        status:'1',
        message:'姓名相同，无法进行添加'
      })
    }else{
      newStaff.save().then(data=>{
        return res.json({
          status:'0',
          message:"success"
        })
      }).catch(err=>{
        return res.json({
          status:'1',
          message:err
        })
      })
    }
  })
})

// 获取员工列表
router.get('/list',function (req,res) {
  var page = parseInt(req.query.page);
  // console.log(parseInt(req.query.page))
  var pageSize = parseInt(req.query.pageSize);
  var skip = parseInt((page - 1) * pageSize);
  Staff.find({}).sort({'date':-1}).skip(skip).limit(pageSize).exec().then(staffs=>{
    if(staffs){
      Staff.count({},function(err,count){
        return res.json({
          status:'0',
          staffList:staffs,
          count:count,
        })
      })
    }
  }).catch(err=>{
    console.log(err)
  })
})
module.exports = router;
