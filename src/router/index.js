import Vue from 'vue'
import Router from 'vue-router'
//引入首页路由
import Home from "../pages/Home"
//引入登录路由
import Login from "../pages/Login"
//引入生产管理路由
import Product from "../pages/Product"
//引入商务管理路由
import Business from "../pages/Business"
//引入入库单路由
import Input from "../pages/Input"
//引入出库单路由
import Output from "../pages/Output"
//引入添加订单路由
import AddOrder from "../pages/AddOrder"
//引入订单路由
import Order from "../pages/Order"
//引入员工信息路由
import Staff from "../pages/Staff"
//引入添加新员工路由
import Register from "../pages/Register"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:'/login'  //页面重定向
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/business',
      name: 'Business',
      component: Business
    },
    {
      path: '/input',
      name: 'Input',
      component: Input
    },
    {
      path: '/output',
      name: 'Output',
      component: Output
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/addOrder',
      name: 'AddOrder',
      component: AddOrder
    },
    {
      path: '/staff',
      name: 'Staff',
      component: Staff
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})


