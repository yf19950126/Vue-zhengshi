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
          <span>{{username}}</span>
          <span style="cursor: pointer;color: cornflowerblue" @click="logOut">退出</span>
        </el-header>
        <el-main style="width: 100%;">
          <div>
            <h3>员工基本信息</h3>
          </div>
          <el-row>
            <el-col :span="24">
              <el-table border stripe :data="staffList">
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    {{scope.row.name}}
                  </template>
                </el-table-column>
                <el-table-column label="职位">
                  <template slot-scope="scope">
                    {{scope.row.position}}
                  </template>
                </el-table-column>
                <el-table-column label="手机">
                  <template slot-scope="scope">
                    {{scope.row.number}}
                  </template>
                </el-table-column>
                <el-table-column label="地址">
                  <template slot-scope="scope">
                    {{scope.row.address}}
                  </template>
                </el-table-column>
                <el-table-column label="入职时间">
                  <template slot-scope="scope">
                    {{scope.row.date | formatDate}}
                  </template>
                </el-table-column>
                <el-table-column label="离职时间">
                  <template slot-scope="scope">
                    {{scope.row.time}}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button type="primary" size="small" @click="isChange(scope.row)">修改</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <router-link to="/register">
                <el-button style="float: right;margin-right: 5%;margin-top: 10px"
                           type="primary" icon="el-icon-edit"
                >新员工入职</el-button>
              </router-link>
            </el-col>
          </el-row>
          <el-dialog title="修改离职信息" :visible.sync="editDialog" @close="resetForm('editForm')">
              <el-form :model="editForm" :rules="rules2" ref="editForm" label-width="80px">
                <el-form-item label="员工姓名" prop="name">
                  <el-input type="text" v-model="editForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="员工电话" prop="phone">
                  <el-input type="text" v-model="editForm.number" ></el-input>
                </el-form-item>
                <el-form-item label="员工地址" prop="email">
                  <el-input type="text" v-model="editForm.address" ></el-input>
                </el-form-item>
                <el-form-item label="员工职位" prop="phone">
                  <el-input type="text" v-model="editForm.position" ></el-input>
                </el-form-item>
                <el-form-item label="入职日期" prop="status">
                    <el-date-picker
                                v-model="editForm.date"
                                type="datetime"
                                placeholder="选择日期时间" :disabled="true"
                                style="width:100%">
                </el-date-picker>
                </el-form-item>
                <el-form-item label="离职时间" prop="time">
                  <el-input type="text" v-model="editForm.time"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateMessage">修改</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
        </el-main>
        <el-row class="margin30" type="flex" justify="end">
          <el-pagination background layout="total,prev, pager, next" :total="total" :page-size="5" @current-change="pageChange" ></el-pagination>
        </el-row>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    mounted(){
      this.getData();
      //  判断页面cookie
      if(document.cookie !== ""){
        axios.post('/users/cookie').then(res=>{
          // console.log(res.data.data);
          this.username=res.data.data;
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    name: "Staffs",
    data() {
      return{
        show:true,
        username:"",
        staffList:[],
        total:0,
        ruleForm2: {
          name:"",
          number:'',
          position:'',
          time:''
        },
        //用于修改用户的对象
        editForm:{
          "name":'',
          "number":'',
          "address":'',
          "position":'',
          "date":'',
          "time":''
        },
        //编辑的对话框
        editDialog:false,
        rules2: {
          number: [
            {message: '请填写手机号码', trigger: 'blur' },
          ],
          address: [
            {message: '请填写地址', trigger: 'blur' },
          ],
          position: [
            {message: '请填写职位', trigger: 'blur' },
          ],
          time: [
            {message: '请填写离职时间', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      showMenu:function(){
        // console.log(this.name)
        if(this.username === "李有山"  || this.username === "牛红珍" || this.username === "李国正"
          || this.username === "陈红喜" || this.username === "裴化民" || this.name === "吕妙玲"){
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
          || this.username === "李有臣" || this.username === "翟海军" || this.name === "吕妙玲" || this.name === "牛红军"){
          this.$router.push({
            path:"/business"
          })
        }else{
          alert('不好意思。您无权查看当前页面')
        }
      },
      resetForm:function(formName){
        if(formName === 'editForm'){
          //编辑的弹出框关掉
          this.editDialog = false;
        }
        //将弹出框里面的内容清空
        this.$refs[formName].resetFields();
      },
      isChange:function(row){
        //编辑的弹出框开启
        this.editDialog = true;
        //可以使用row里面的数据，将整行的用户信息输出
        this.editForm.name = row.name;
        this.editForm.number = row.number;
        this.editForm.address = row.address;
        this.editForm.position = row.position;
        this.editForm.date = row.date;
        this.editForm.time = row.time;
      },
      updateMessage:function(){
        axios.post('/users/updateMessage',this.editForm)
          .then(response=>{
            var res = response.data;
            if(res.status === '0'){
              this.resetForm('editForm');
              this.$message.success('修改成功');
              this.getData();
            }
          }).catch(err=>{
          console.log(err);
        })
      },
      getData:function (page) {
        axios.get('/users/list',{
          params:{
            page:page || 1,
            pageSize:5
          }
        }).then(res=>{
          //console.log(res.data);
          this.staffList = res.data.staffList;
          this.total = res.data.count;
          // console.log(res.data.count)
        }).catch(err=>{
          console.log(err)
        })
      },
      pageChange:function(value){
        this.getData(value);
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

  }
</script>

<style scoped>
 .el-container /deep/ .el-dialog {
    width: 70%;
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

</style>
