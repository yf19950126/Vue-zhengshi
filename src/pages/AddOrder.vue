<template>
  <div class="content">
    <el-container style="height: 650px; border: 1px solid #eee;">
      <transition name="in" mode="out-in">
        <el-aside width="200px" class="ads" v-show="show">
          <el-menu :default-openeds="['1', '7']">
            <router-link to="/home">
              <el-menu-item index="1">
                <template slot="title"><i class="el-icon-menu"></i>首页</template>
              </el-menu-item>
            </router-link>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-sold-out"></i>生产管理</template>
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
              <template slot="title"><i class="el-icon-info"></i>员工管理</template>
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
          <i @click="click" class="el-icon-more more" style="float: left;margin-top: 20px;font-size: 20px;cursor: pointer"></i>
          <span>{{name}}</span>
          <span style="cursor: pointer;color: cornflowerblue" @click="logOut">退出</span>
        </el-header>

        <el-main>
          <div class="font">添加电机订单</div>
          <div class="form">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
              <el-form-item label="订单编号" prop="orderId">
                <el-input v-model="ruleForm2.orderId" placeholder="请输入订单编号"></el-input>
              </el-form-item>
              <el-form-item label="订单日期" prop="date">
                <el-date-picker style="width: 200px;"
                                v-model="ruleForm2.date"
                                type="datetime"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="客户名称" prop="companyName">
                <el-input v-model="ruleForm2.companyName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
              <el-form-item label="电机型号" prop="motorId">
                <el-input v-model="ruleForm2.motorId" placeholder="请输入电机型号"></el-input>
              </el-form-item>
              <el-form-item label="维修内容" prop="reason">
                <el-input v-model="ruleForm2.reason" placeholder="请输入维修原因"></el-input>
              </el-form-item>
              <el-form-item label="维修数量" prop="number">
                <el-input  v-model="ruleForm2.number" autocomplete="off" placeholder="请输入维修数量"></el-input>
              </el-form-item>
              <el-form-item label="维修状态" prop="status">
                <el-select v-model="ruleForm2.status" placeholder="请选择维修状态" style="width: 200px;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发货时间" prop="SendDate">
                <el-input  v-model="ruleForm2.SendDate" autocomplete="off" placeholder="请输入发货时间"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: "AddOrder",
    data() {
      return{
        show:true,
        name:"",
        options: [{
          value: '未维修',
          label: '未维修'
        }, {
          value: '维修中',
          label: '维修中'
        }, {
          value: '完工',
          label: '完工'
        },
          {
            value: '已发货',
            label: '已发货'
          }],
        value: '',
        ruleForm2: {
          orderId:'',
          date:'',
          companyName:'',
          motorId:'',
          reason:'',
          number:'',
          status:'',
          SendDate:''
        },
        rules2: {
          orderId: [
            { required: true, message: '请输入订单编号', trigger: 'blur' },
          ],
          date:[
            {type:'date',required:true,message:'请填写时间',trigger:'blur'}
          ],
          companyName: [
            { required: true, message: '请输入客户名称', trigger: 'blur' },
          ],
          motorId: [
            { required: true, message: '请输入电机型号', trigger: 'blur' },
          ],
          reason: [
            { required: true, message: '请输入维修原因', trigger: 'blur' },
          ],
          number: [
            { required: true, message: '请输入维修数量', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '请选择维修状态', trigger: 'blur' },
          ],
          SendDate:[
            {message:'请填写时间',trigger:'blur'}
          ],
        }
      }
    },
    methods:{
      showMenu:function(){
        // console.log(this.name)
        if(this.name === "李有山"  || this.name === "牛红珍" || this.name === "李国正"
          || this.name === "陈红喜" || this.name === "裴化民" || this.name === "吕妙玲"){
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
        || this.name === "李有臣" || this.name === "翟海军" || this.name === "侯安红" || this.name === "吕妙玲" || this.name === "牛红军"){
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
      submitForm:function(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //提交
            axios.post('/users/addOrder',this.ruleForm2)
              .then(response=>{
                var res = response.data;
                if(res.status === '0'){
                  //显示成功的消息提示
                  this.$message.success('添加成功');
                  this.backLogin();
                  this.$refs[formName].resetFields();
                }else{
                  //返回了错误的提示消息的时候
                  this.$message.error(res.message);
                }
              }).catch(err=>{
              console.log(err);
            })
          }else{
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      backLogin:function () {
        this.$router.push({
          path:"/order"
        })
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
  .el-input{
    width: 200px;
  }
  .font{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }
  .form{
    width: 300px;
    margin: 30px auto;
  }
  .in-enter{
    transform: translateX(-30%);
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
