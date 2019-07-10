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
        <el-header style="width: 100%;text-align: right;font-size: 16px;">
          <i @click="click" class="el-icon-more more" style="float: left;margin-top: 20px;font-size: 20px;cursor: pointer"></i>
          <span>{{username}}</span>
          <span style="cursor: pointer;color: cornflowerblue" @click="logOut">退出</span>
        </el-header>
        <div class="content-form">
          <div class="font">新入职员工信息</div>
          <div class="form">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
              <el-form-item label="员工姓名" prop="name">
                <el-input v-model="ruleForm2.name" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="员工电话" prop="number">
                <el-input v-model="ruleForm2.number" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="员工地址" prop="address">
                <el-input v-model="ruleForm2.address" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="员工职位" prop="position">
                <el-input v-model="ruleForm2.position" placeholder="请输入职位"></el-input>
               </el-form-item>
              <el-form-item label="入职日期" prop="date">
                <el-date-picker
                                v-model="ruleForm2.date"
                                type="datetime"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="离职时间" prop="time">
                <el-input v-model="ruleForm2.time" placeholder="请输入离职时间"></el-input>
               </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {isvalidPhone} from '../validate'
  import axios from "axios"
  export default {
    name: "Home",
    data() {
      const validPhone=(rule, value,callback)=>{
        if (!value){
          callback(new Error('请输入电话号码'))
        }else  if (!isvalidPhone(value)){
          callback(new Error('请输入正确的11位手机号码'))
        }else {
          callback()
        }
      };
      return{
        username:'',
        show:true,
        ruleForm2: {
          name:'',
          position:'',
          number:'',
          address:'',
          date:'',
          time:''
        },
        rules2: {
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '请输入职位', trigger: 'blur' },
          ],
          number: [
            { required: true,message: '请输入正确的手机号', trigger: 'blur', validator: validPhone }//这里需要用到全局变量
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
          ],
          date:[
            {type:'date',required:true,message:'请填写时间',trigger:'blur'}
          ],
          time:[
            {message:'请填写离职时间',trigger:'blur'}
          ],
        }
      }
    },
    mounted(){
      if(document.cookie !== ""){
        axios.post('/users/cookie').then(res=>{
          // console.log(res.data.data);
          this.username=res.data.data;
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    methods:{
      showMenu:function(){
        // console.log(this.name)
        if(this.username === "李有山"  || this.username === "牛红珍" || this.username === "李国正"
          || this.username === "陈红喜" || this.username === "裴化民" || this.username === "吕妙玲"){
          this.$router.push({
            path:"/product"
          })
        }else{
          alert('不好意思。您无权查看当前页面')
        }
      },
      showBusiness:function(){
        // console.log(this.name)
        if(this.username === "李有山"  || this.username === "牛红珍" || this.username === "李国正"
        || this.username === "李有臣" || this.username === "翟海军" || this.username === "吕妙玲" || this.username === "牛红军"  || this.username === "侯安红"){
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
            axios.post('/users/register',this.ruleForm2)
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
          path:"/staff"
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
    }
  }
</script>

<style scoped>
  .el-input{
    width: 200px;
  }
  .in-enter{
    transform: translateX(-50%);
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
  .content-form .font{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }
  .content-form .form{
    width: 300px;
    margin: 30px auto;
  }

</style>
