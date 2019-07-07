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
                <router-link to="/business">
                  <el-menu-item index="3-1">
                    <template slot="title">商务信息</template>
                  </el-menu-item>
                </router-link>
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
          <h3 style="margin-bottom: 50px">商务信息</h3>
          <el-row>
            <el-col :span="24">
              <el-table border stripe :data="BusinessList">
                <el-table-column label="日期">
                  <template slot-scope="scope">
                    {{scope.row.date | formatDate}}
                  </template>
                </el-table-column>
                <el-table-column label="出勤类型">
                  <template slot-scope="scope">
                    {{scope.row.type}}
                  </template>
                </el-table-column>
                <el-table-column label="人员名称">
                  <template slot-scope="scope">
                    {{scope.row.username}}
                  </template>
                </el-table-column>
                <el-table-column label="联系方式">
                  <template slot-scope="scope">
                    {{scope.row.phone}}
                  </template>
                </el-table-column>
                <el-table-column label="客户名称">
                  <template slot-scope="scope">
                    {{scope.row.companyName}}
                  </template>
                </el-table-column>
                <el-table-column label="出勤成果">
                  <template slot-scope="scope">
                    {{scope.row.gain}}
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="open" style="float: right;margin-right: 8%;margin-top: 10px"
                         type="primary" size="small" icon="el-icon-edit"
              >添加出勤信息
              </el-button>
            </el-col>
          </el-row>
          <el-dialog title="添加出勤信息" :visible.sync="addDialog" @close="resetForm('addForm')">
            <el-form :model="addForm" :rules="rules2" ref="addForm" label-width="80px">
              <el-form-item label="出勤日期" prop="date">
                <el-date-picker style="width: 100%;"
                  v-model="addForm.date"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="出勤类型" prop="type">
                <el-select v-model="addForm.type" placeholder="请选择出勤类型" style="width: 100%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="人员名称" prop="username">
                <el-input type="text" v-model="addForm.username" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input type="text" v-model="addForm.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="客户名称" prop="companyName">
                <el-input type="text" v-model="addForm.companyName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
              <el-form-item label="出勤成果" prop="gain">
                <el-input type="text" v-model="addForm.gain" placeholder="请输入出勤成果"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-main>
        <el-row type="flex" justify="end">
          <el-pagination background layout="total,prev, pager, next" :total="total" :page-size="5" @current-change="pageChange" ></el-pagination>
        </el-row>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {isvalidPhone} from '../validate'
  import axios from "axios"
  export default {
    name: "Business",
    mounted() {
      this.getData();
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
        show:true,
        name:"",
        total:0,
        BusinessList:[],
        options: [{
          value: '商务出差',
          label: '商务出差'
        }, {
          value: '售后出差',
          label: '售后出差'
        },{
          value: '正常出勤',
          label: '正常出勤'
        }],
        value: '',
        addForm: {
          date:'',
          type:'',
          username:'',
          phone:'',
          companyName:'',
          gain:''
        },
        addDialog:false,
        rules2: {
          date:[
            {type:'date',required:true,message:'请填写时间',trigger:'blur'}
          ],
          type: [
            { required: true, message: '请选择出勤类型', trigger: 'blur' },
          ],
          username: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true,message: '请输入正确的手机号', trigger: 'blur', validator: validPhone }//这里需要用到全局变量
          ],
          companyName: [
            { required: true, message: '请输入客户名称', trigger: 'blur' },
          ],
          gain: [
            { required: true, message: '请选择出勤成果', trigger: 'blur' },
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
      open:function(){
        this.addDialog = true;
      },
      resetForm:function(formName){
        if(formName === 'addForm'){
          this.addDialog = false;
        }
        this.$refs[formName].resetFields();
      },
      click:function () {
        this.show=!this.show;
      },
      //表单提交
      submitForm:function(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //提交
            axios.post('/users/addBusiness',this.addForm)
              .then(response=>{
                var res = response.data;
                if(res.status === '0'){
                  //显示成功的消息提示
                  this.$message.success('添加成功');
                  this.resetForm('addForm');
                  //重新获取下最新数据
                  this.getData();
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
      getData(page) {
        axios.get('/users/businessList',{
          params:{
            page:page || 1,
            pageSize:5
          }
        }).then(response => {
          const res = response.data;
          this.BusinessList = res.BusinessList;
          this.total = res.count;
          // console.log(res.count);
        })
      },
      pageChange:function(value){
        this.getData(value);
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
  }
</script>

<style scoped>
  .el-container /deep/ .el-dialog {
    width: 80%;
    margin: 0 auto;
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
