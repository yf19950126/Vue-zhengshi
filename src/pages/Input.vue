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

        <el-main class="demo-input-size">
          <div>
            <h3 style="margin-bottom: 50px">入库单</h3>
          </div>
          <el-row>
            <el-col :span="24">
              <el-table
              border stripe :data="machineList">
                <el-table-column prop="date" label="进货日期">
                  <template slot-scope="scope">
                    {{scope.row.date | formatDate}}
                  </template>
                </el-table-column>
                <el-table-column prop="people" label="进货人员">
                  <template slot-scope="scope">
                    {{scope.row.people}}
                  </template>
                </el-table-column>
                <el-table-column prop="motorName" label="电机、配件及材料">
                  <template slot-scope="scope">
                    {{scope.row.motorName}}
                  </template>
                </el-table-column>
                <el-table-column  prop="motorWork" label="工具及设备">
                  <template slot-scope="scope">
                    {{scope.row.motorWork}}
                  </template>
                </el-table-column>
                <el-table-column prop="motorAddress" label="供货单位">
                  <template slot-scope="scope">
                    {{scope.row.motorAddress}}
                  </template>
                </el-table-column>
                <el-table-column prop="motorMoney" label="单价">
                  <template slot-scope="scope">
                    {{scope.row.motorMoney}}
                  </template>
                </el-table-column>
                <el-table-column  prop="motorNumber" label="数量">
                  <template slot-scope="scope">
                    {{scope.row.motorNumber}}
                  </template>
                </el-table-column>
                <el-table-column label="合计">
                  <template slot-scope="scope">
                  {{scope.row.motorMoney * scope.row.motorNumber}}
                  </template>
                </el-table-column>
              </el-table>
                 <el-button style="float: right;margin-right: 5%;margin-top: 10px"
                            type="primary" icon="el-icon-edit" @click="open"
                 >入库配件</el-button>
            </el-col>
          </el-row>
          <el-dialog title="添加入库配件" :visible.sync="addDialog" @close="resetForm('addForm')">
            <el-form :model="addForm" :rules="rules2" ref="addForm" label-width="80px">
              <el-form-item label="进货人员" prop="people">
                <el-input v-model="addForm.people" placeholder="请输入进货人员"></el-input>
              </el-form-item>
              <el-form-item label="电机、配件及材料" prop="motorName">
                <el-input v-model="addForm.motorName" placeholder="请输入电机、配件及材料"></el-input>
              </el-form-item>
              <el-form-item label="工具及设备" prop="motorWork">
                <el-input  v-model="addForm.motorWork" autocomplete="off" placeholder="请输入工具及设备"></el-input>
              </el-form-item>
              <el-form-item label="供货单位" prop="motorAddress" >
                <el-input  v-model="addForm.motorAddress" autocomplete="off" placeholder="请输入供货单位"></el-input>
              </el-form-item>
              <el-form-item label="单价" prop="motorMoney" >
                <el-input  v-model="addForm.motorMoney" autocomplete="off" placeholder="请输入电机单价"></el-input>
              </el-form-item>
              <el-form-item label="数量" prop="motorNumber">
                <el-input v-model="addForm.motorNumber" placeholder="请输入电机数量"></el-input>
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
    name: "Input",
    data() {
      return{
        show:true,
        name:"",
        input6: '',
        input7: '',
        input8: '',
        machineList:[],
        total:0,
        addForm: {
          people:'',
          motorName:'',
          motorAddress:'',
          motorWork:'',
          motorMoney:'',
          motorNumber:''
        },
        addDialog:false,
        rules2: {
          people: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
          ],
          motorName: [
            { message: '请输入电机、配件及材料', trigger: 'blur' },
          ],
          motorAddress: [
            { message: '请输入供货单位', trigger: 'blur' },
          ],
          motorWork: [
            {message: '请输入工具及设备', trigger: 'blur' },
          ],
          motorMoney: [
            { required: true, message: '请输入电机单价', trigger: 'blur' },
          ],
          motorNumber: [
            { required: true, message: '请输入电机数量', trigger: 'blur' },
          ],
        },
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
      open:function(){
        this.addDialog = true;
      },
      resetForm:function(formName){
        if(formName === 'addForm'){
          this.addDialog = false;
        }
        this.$refs[formName].resetFields();
      },
      submitForm:function(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //提交
            axios.post('/users/addMachine',this.addForm)
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
        axios.get('/users/machineList',{
          params:{
            page:page || 1,
            pageSize:5
          }
        }).then(response => {
          const res = response.data;
          this.machineList = res.machineList;
          this.total = res.count;
          // console.log(res.count);
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
