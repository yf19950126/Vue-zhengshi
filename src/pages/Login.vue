<template>
    <div class="content">
        <div class="logo">
          <img src="../assets/img/logo.jpg" alt="">
        </div>
        <div class="font">
          正势集团
        </div>
        <div class="userLogin">欢迎登录正势集团</div>
      <div style="margin-top: 50px">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name" style="width: 330px;margin: 20px auto">
            <el-input type="name" v-model="ruleForm2.name" autocomplete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass" style="width: 330px; margin: 20px auto">
            <el-input show-password type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item style="width: 330px; margin: 50px auto">
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
            <el-button @click="resetForm('ruleForm2')">取消登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <p>@版权所有 |  正势集团  |  纪律检查小组</p>
        <p>HTTPS证书验证电话：13934870011</p>
      </div>
    </div>
</template>

<script>
  import axios  from "axios"
    export default {
      name: "Login",
      data() {
        const validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        return {
          ruleForm2: {
            name:'',
            pass: '',
          },
          rules2: {
            name: [
              { required: true, message: '请输入真实姓名', trigger: 'blur' },
              { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
            ],
            pass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { validator: validatePass, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm:function(formName){
          this.$refs[formName].validate((valid)=>{
            if(valid){
              //提交
              axios.post('/users/login',this.ruleForm2)
                .then(response=>{
                  const res = response.data;
                  if(res.status === 1){
                    //显示成功的消息提示
                    this.$message.success('登录成功');
                    // console.log(document.cookie)
                    this.backHome();
                    this.$refs[formName].resetFields();
                  }else{
                    //返回了错误的提示消息的时候
                    this.$message.error(res.msg);
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
        backHome:function () {
          this.$router.push({
            path:'/home'
          })
        }
      }
    }
</script>

<style scoped>
.content{
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left: 0;
}
  .logo{
    width: 100px;
    height: 100px;
    margin-left: 5%;
    margin-top: 5px;
    float: left;
  }
  .logo img{
    width: 100%;
    height: 100%;
  }
  .font{
    width: 50%;
    height: 100px;
    font-size: 30px;
    text-align: center;
    line-height: 100px;
    margin-left: 25%;
    font-weight: bold;
  }
  .userLogin{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 26px;
    margin-top: 30px;
  }
  .footer{
      text-align: center;
    margin-top: 168px;
    color: gray;
  }
</style>
