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
            <h3 style="margin-bottom: 50px">出库单</h3>
            <el-table
              :data="outputMachineList"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column prop="date" label="使用日期">
                <template slot-scope="scope">
                  {{scope.row.date | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="people"
                label="使用人员"
                width="180">
                <template slot-scope="scope">
                  {{scope.row.people}}
                </template>
              </el-table-column>
              <el-table-column
                prop="motorName"
                label="电机、配件及材料"
                width="180">
                <template slot-scope="scope">
                  {{scope.row.motorName}}
                </template>
              </el-table-column>
              <el-table-column
                prop="motorAddress"
                label="工具及设备"
                >
                <template slot-scope="scope">
                  {{scope.row.motorAddress}}
                </template>
              </el-table-column>
               <el-table-column
                prop="motorNumber"
                label="数量"
              >
                <template slot-scope="scope">
                  {{scope.row.motorNumber}}
                </template>
              </el-table-column>
              <el-table-column
                prop="motorMoney"
                label="用途"
              >
                <template slot-scope="scope">
                  {{scope.row.motorMoney}}
                </template>
              </el-table-column>
              <el-table-column label="归还时间">
                <template slot-scope="scope">
                    {{scope.row.time}}
                  </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                    {{scope.row.remarks}}
                  </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button type="primary" size="small" @click="isChange(scope.row)">修改</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <el-button style="float: right;margin-right: 5%;margin-top: 10px"
                       type="primary" icon="el-icon-edit" @click="open"
            >使用配件</el-button>
          <el-dialog title="添加出库配件" :visible.sync="addDialog" @close="resetForm1('addForm')">
            <el-form :model="addForm" :rules="rules2" ref="addForm" label-width="80px">
              <el-form-item label="使用日期" prop="date">
                <el-date-picker style="width: 100%;"
                                v-model="addForm.date"
                                type="datetime"
                                placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="使用人员" prop="people">
                <el-input v-model="addForm.people" placeholder="请输入使用人员"></el-input>
              </el-form-item>
              <el-form-item label="电机、配件及材料" prop="motorName">
                <el-input v-model="addForm.motorName" placeholder="请输入电机、配件及材料"></el-input>
              </el-form-item>
              <el-form-item label="工具及设备" prop="motorAddress">
                <el-input v-model="addForm.motorAddress" placeholder="请输入使用的工具或设备"></el-input>
              </el-form-item>
              <el-form-item label="数量" prop="motorNumber" >
                <el-input  v-model="addForm.motorNumber" autocomplete="off" placeholder="请输入数量"></el-input>
              </el-form-item>
              <el-form-item label="用途" prop="motorMoney">
                <el-input v-model="addForm.motorMoney" placeholder="请输入用途"></el-input>
              </el-form-item>
              <el-form-item label="归还时间" prop="time">
                <el-input v-model="addForm.time" placeholder="请输入归还时间"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remarks">
                <el-input v-model="addForm.remarks" placeholder="请输入备注"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
           <el-dialog title="修改出库信息" :visible.sync="editDialog" @close="resetForm('editForm')">
              <el-form :model="editForm" :rules="rules3" ref="editForm" label-width="80px">
                 <el-form-item label="使用日期" prop="date">
                <el-date-picker style="width: 100%;"
                                v-model="editForm.date"
                                type="datetime"
                                placeholder="选择日期时间"  :disabled="true">
                </el-date-picker>
              </el-form-item>
                <el-form-item label="使用人员" prop="people">
                  <el-input type="text" v-model="editForm.people" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电机配件" prop="motorName">
                  <el-input type="text" v-model="editForm.motorName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="工具材料" prop="motorAddress">
                  <el-input type="text" v-model="editForm.motorAddress" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="motorNumber">
                  <el-input type="text" v-model="editForm.motorNumber" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用途" prop="motorMoney">
                  <el-input type="text" v-model="editForm.motorMoney" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="归还时间" prop="time">
                  <el-input type="text" v-model="editForm.time"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                  <el-input type="text" v-model="editForm.remarks" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateOut">修改</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
        </el-main>
        <el-row type="flex" justify="end" style="clear: both">
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
    name: "Output",
    data() {
      return{
        show:true,
        name:"",
        outputMachineList:[],
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: '',
        total:0,
        addForm: {
          date:'',
          people:'',
          motorName:'',
          motorAddress:'',
          motorMoney:'',
          motorNumber:'',
          time:'',
          remarks:''
        },
        addDialog:false,
        rules2: {
          date:[
            {type:'date',required:true,message:'请填写时间',trigger:'blur'}
          ],
          people: [
            { required: true, message: '请输入使用人员', trigger: 'blur' },
          ],
          motorName: [
            { message: '请输入电机、配件及材料', trigger: 'blur' },
          ],
          motorAddress: [
            { message: '请输入工具及设备', trigger: 'blur' },
          ],
          motorMoney: [
            { required: true, message: '请输入数量', trigger: 'blur' },
          ],
          motorNumber: [
            { required: true, message: '请输入用途', trigger: 'blur' },
          ],
          time: [
            { message: '请输入归还时间', trigger: 'blur' },
          ],
          remarks: [
            {message: '请输入备注', trigger: 'blur' },
          ],
        },
        ruleForm2: {
          time:"",
          remarks:'',
        },
        //用于修改用户的对象
        editForm:{
          "date":'',
          "people":'',
          "motorName":'',
          "motorAddress":'',
          "motorNumber":'',
          "motorMoney":'',
          "time":'',
          "remarks":''
        },
        //编辑的对话框
        editDialog:false,
        rules3: {
          time: [
            {message: '请填写g归还时间', trigger: 'blur' },
          ],
          remarks: [
            {message: '请填写备注', trigger: 'blur' },
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
      resetForm1:function(formName){
        if(formName === 'addForm'){
          this.addDialog = false;
        }
        this.$refs[formName].resetFields();
      },
      submitForm:function(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            //提交
            axios.post('/users/addOutputMachine',this.addForm)
              .then(response=>{
                var res = response.data;
                if(res.status === '0'){
                  //显示成功的消息提示
                  this.$message.success('添加成功');
                  this.resetForm1('addForm');
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
        this.editForm.date = row.date;
        this.editForm.people = row.people;
        this.editForm.motorName = row.motorName;
        this.editForm.motorAddress = row.motorAddress;
        this.editForm.motorNumber = row.motorNumber;
        this.editForm.motorMoney = row.motorMoney;
        this.editForm.time = row.time;
        this.editForm.remarks = row.remarks;
      },
      updateOut:function(){
        axios.post('/users/updateOut',this.editForm)
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
      getData(page) {
        axios.get('/users/outputMachineList',{
          params:{
            page:page || 1,
            pageSize:5
          }
        }).then(response => {
          const res = response.data;
          this.outputMachineList = res.outputMachineList;
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
