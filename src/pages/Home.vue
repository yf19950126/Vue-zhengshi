<template>
  <div class="content">
    <el-container style="height: 650px; border: 1px solid #eee;">
      <transition name="in" mode="out-in">
        <el-aside width="200px" class="ads" v-show="show">
          <el-menu :default-openeds="['1', '7']">
            <router-link to="/home">
              <el-menu-item index="1">
                <template slot="title">首页</template>
              </el-menu-item>
            </router-link>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>生产管理</template>
              <el-menu-item-group>
                  <el-menu-item index="2-1" @click="showMenu">
                    <template slot="title">生产信息</template>
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-phone-outline"></i>商务管理</template>
              <el-menu-item-group>
                  <el-menu-item index="3-1" @click="showBusiness">
                    <template slot="title">商务信息</template>
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-goods"></i>库房管理</template>
              <el-menu-item-group>
                <router-link to="/input">
                  <el-menu-item index="4-1">入库单</el-menu-item>
                </router-link>
                <router-link to="/output">
                  <el-menu-item index="4-2">出库单</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-printer"></i>订单管理</template>
              <el-menu-item-group>
                <router-link to="/addOrder">
                  <el-menu-item index="5-1">添加订单</el-menu-item>
                </router-link>
              </el-menu-item-group>
              <el-menu-item-group>
                <router-link to="/order">
                  <el-menu-item index="5-2">所有订单</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-printer"></i>员工管理</template>
              <el-menu-item-group>
                <router-link to="/staff">
                  <el-menu-item index="6-1">员工基本信息</el-menu-item>
                </router-link>
                <router-link to="/register">
                  <el-menu-item index="6-2">入职新员工</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </transition>
      <el-container>
        <el-header style="width:100%;text-align: right;font-size: 16px;">
          <i @click="click" class="el-icon-menu menu"></i>
          <span>{{name}}</span>
          <span style="cursor: pointer;color: cornflowerblue" @click="logOut">退出</span>
        </el-header>

        <el-main class="readme-container">
          <h2 class="title" style="text-align: center;">欢迎来到山西正势集团</h2>
          <div class="img">
            <img style="width: 100%;height: 100%;" src="../assets/img/logo.jpg" alt="">
          </div>
          <div class="footer">
            <p>@版权所有 |  正势集团  |  纪律检查小组</p>
            <p>HTTPS证书验证电话：13934870011</p>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: "Home",
    data() {
      return{
        show:true,
        name:"",
      }
    },
    methods:{
      showMenu:function(){
        // console.log(this.name)
        if(this.name === "李有山"  || this.name === "牛红珍" ||  this.name === "李国正"
          || this.name === "陈红喜" || this.name === "裴化民"){
          this.$router.push({
            path:"/product"
          })
        }else{
          alert('不好意思。您无权查看当前页面')
        }
      },
      showBusiness:function(){
        // console.log(this.name)
        if(this.name === "李有山"  || this.name === "牛红珍" || this.name === "李国正"
        || this.name === "李有臣" || this.name === "翟海军"){
          this.$router.push({
            path:"/business"
          })
        }else{
          alert('不好意思。您无权查看当前页面')
        }
      },
      click:function () {
        this.show=!this.show;
      },
      logOut: function(){
        axios.post("/users/logout").then((response)=>{
          let res = response.data;
          if(res.status==="0"){
            this.$router.push({
              path:"/login"
            })
            this.$message.success('退出成功');
          }
        })
      },
    },
    mounted() {
      //  判断页面cookie
      if(document.cookie !== ""){
        axios.post('/users/cookie').then(res=>{
          // console.log(res.data.data);
          this.name=res.data.data;
        }).catch(err=>{
          console.log(err)
        })
      }
    },
  }
</script>

<style scoped>
  .menu{
    float: left;
    margin-top: 20px;
    font-size: 20px;
    cursor: pointer
  }
  .readme-container{
    width: 100%;
    background: #eef1f6;
    padding: 20px;
  }
  .img{
    width: 250px;
    height: 250px;
    margin: 50px auto;
  }
  .footer{
    width: 300px;
    height: 100px;
    margin: 96px auto 0 auto;
    line-height: 50px;
    text-align: center;
  }
  .footer p{
    margin: 0;
    padding: 0;
  }
  .in-enter{
    transform: translate3d(-180px,0,0);
  }
  .in-enter-active{
    transition: all 0.5s;
    position: absolute;
  }
  a{
    text-decoration: none;
  }
  .fa-home,.fa-user-o{
    padding-left: 5px ;
    padding-right: 10px;
    font-size: 19px;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    height: 650px;
    color: #333;
  }
</style>
