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
              <el-form>
                <el-form-item label="订单编号">
                  <el-input ref="content" v-model="search" placeholder="请输入订单编号" style="width: 300px;"></el-input>
                </el-form-item>
              </el-form>
            <div>
              <h3>所有订单</h3>
            </div>
            <el-row>
              <el-col :span="24">
                <el-table border stripe :data="orderLists">
                  <el-table-column label="订单编号">
                    <template slot-scope="scope">
                      {{scope.row.orderId}}
                    </template>
                  </el-table-column>
                  <el-table-column label="订单日期">
                    <template slot-scope="scope">
                      {{scope.row.date | formatDate}}
                    </template>
                  </el-table-column>
                  <el-table-column label="客户名称">
                    <template slot-scope="scope">
                      {{scope.row.companyName}}
                    </template>
                  </el-table-column>
                  <el-table-column label="电机型号">
                    <template slot-scope="scope">
                      {{scope.row.motorId}}
                    </template>
                  </el-table-column>
                  <el-table-column label="维修内容">
                    <template slot-scope="scope">
                      {{scope.row.reason}}
                    </template>
                  </el-table-column>
                  <el-table-column label="维修数量">
                    <template slot-scope="scope">
                      {{scope.row.number}}
                    </template>
                  </el-table-column>
                  <el-table-column label="维修状态" class="table">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="isChange(scope.row)">
                         {{scope.row.status}}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="发货日期">
                    <template slot-scope="scope">
                      {{scope.row.SendDate}}
                    </template>
                  </el-table-column>
                </el-table>
                <router-link to="/addOrder">
                  <el-button style="float: right;margin-right: 6%;margin-top: 10px"
                             type="primary" size="small" icon="el-icon-edit"
                  >添加订单</el-button>
                </router-link>
              </el-col>
            </el-row>
            <el-dialog title="修改维修状态" :visible.sync="editDialog" @close="resetForm('editForm')">
              <el-form :model="editForm" :rules="rules2" ref="editForm" label-width="80px">
                <el-form-item label="客户名称" prop="companyName">
                  <el-input type="text" v-model="editForm.companyName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电机型号" prop="phone">
                  <el-input type="text" v-model="editForm.motorId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="维修内容" prop="email">
                  <el-input type="text" v-model="editForm.reason" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="维修数量" prop="phone">
                  <el-input type="text" v-model="editForm.number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="维修状态" prop="status">
                  <el-select v-model="editForm.status" placeholder="请选择维修状态" style="width: 140px;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发货时间" prop="SendDate">
                  <el-input type="text" v-model="editForm.SendDate"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateStatus">修改</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
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
    name: "Order",
    data() {
      return{
        //搜索
        search:"",
        show:true,
        name:"",
        input6: '',
        input7: '',
        input8: '',
        orderList:[],
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
          status:'',
          SendDate:''
        },
        //用于修改用户的对象
        editForm:{
          "companyName":'',
          "motorId":'',
          "reason":'',
          "number":'',
          "status":'',
          "SendDate":''
        },
        //编辑的对话框
        editDialog:false,
        rules2: {
          status: [
            { required: true, message: '请选择维修状态', trigger: 'blur' },
          ],
          SendDate: [
            {message: '请填写发货时间', trigger: 'blur' },
          ],
        }
      }
    },
    computed: {
      orderLists: function () {
        var orderList_array = this.orderList,
          search = this.search;
        if(!search){
          return orderList_array;
        }
        search = search.trim().toLowerCase();
        orderList_array =orderList_array.filter(function(item){
          if(item.orderId.toLowerCase().indexOf(search) !== -1){
            return item;
          }
        })
        // Return an array with the filtered data.
        return orderList_array;
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
          || this.name === "李有臣" || this.name === "翟海军" || this.name === "吕妙玲" || this.name === "牛红军"){
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
        this.editForm.companyName = row.companyName;
        this.editForm.motorId = row.motorId;
        this.editForm.reason = row.reason;
        this.editForm.number = row.number;
        this.editForm.money = row.money;
        this.editForm.status = row.status;
      },
      updateStatus:function(){
        axios.post('/users/updateStatus',this.editForm)
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
      getData() {
        axios.get('/users/orderList',{

        }).then(response => {
          const res = response.data;
          this.orderList = res.orderLists;
          // console.log(res.orderList)
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

  .el-aside {
    height: 650px;
    color: #333;
  }
</style>
