<template>
  <div class="homeRegister content">
    <div class="registerBox">
      <Form 
        :model="information" 
        status-icon 
        :rules="rules" 
        ref="information" 
        labelWidth="0" 
        class="form demo-input-suffix"
      >
        <FormItem label="" prop="imgUrl"  id="fenlei">
          <div class="el-input upDownImg">
            <Avatar width="100" height="100" defaultPic="../../assets/img/default_user_head.png" @success="success" method="success"/>
          </div>
        </FormItem>
        <FormItem label="" prop="phoneNumber">
          <img src="../../assets/img/register_sj.png" alt="">
          <Input v-model.number="information.phoneNumber"  placeholder="输入手机号码" :maxlength="11" size="medium"/>
        </FormItem>
        <!-- <FormItem label="" prop="securityCode">
          <img src="../../assets/img/register_yzm.png" alt="" class="check">
          <Input type="text" v-model.trim="information.securityCode" auto-complete="off" :maxlength="6" placeholder="请输入6位验证码"/>
          <Button type="primary" class="verify" :disabled="flag"  @click="codea" > {{ codenum }}</Button>
        </FormItem> -->
        <FormItem label="" prop="password">
          <img src="../../assets/img/register_mm.png" alt="">
          <Input type="password" v-model="information.password" :minlength="6" :maxlength="12" placeholder="请输入密码" size="medium"/>
        </FormItem>
        <FormItem label="" prop="passwordAgin" >
          <img src="../../assets/img/register_mm.png" alt="">
          <Input type="password" :maxlength="12" v-model="information.passwordAgin" placeholder="请再次输入密码" size="medium"/>
        </FormItem>
        <!-- <FormItem label="" prop="agree" >
          <span>
            <Checkbox v-model="checked"></Checkbox > 
            <a href="#" target="_blank" style="color:#666;">注册协议</a>
          </span>  
        </FormItem> -->
        <FormItem class="login">
          <p class="text" @click="$router.push('/login')">已有账号，<i>前去登录</i></p>
        </FormItem>
        <FormItem class="sign_in">
          <Button type="primary" class="loginBtn" @click="submit" size="medium">确认注册</Button>
        </FormItem>
        </Form>
    </div>
  </div>
</template>

<script>
import {
  Button,Carousel,CarouselItem,Form,FormItem,
  Input,Radio,RadioGroup,Checkbox,Dialog
} from 'element-ui'
import Avatar from '../../components/Avaters.vue'
import md5 from 'md5'
export default {
  name: 'homeRegister',
  components: {
    Button,CarouselItem,Carousel,Form,FormItem,
    Input,Avatar,Radio,RadioGroup,Checkbox,Dialog
  },

  data() {
    var passwordValidator =(rule, value, callback) => {
      if (
      this.information.passwordAgin &&
      this.information.passwordAgin != this.information.password
      ) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var passwordAginValidator =(rule, value, callback) => {
      if (value !== this.information.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      centerDialogVisible:false,      // 协议打开
      checked: true,                  // 注册协议勾选框
      flag: false,
      codenum: '获取验证码',            // 按钮显示文字
      num: 180,
      IntervalId: null,
      information: {
        phoneNumber: '',             // 手机号
        securityCode: '',            // 验证码
        password: '',                // 密码
        passwordAgin: '',            // 重复密码
        logo: ''                     // 头像
      },
      rules: {
        phoneNumber: [{
            required: true,
            type: 'number',
            message: '请输入正确手机号',
            trigger: 'blur'
        },{
            pattern:/^1[345789]\d{9}$/,
            message:'请输入正确的手机号',
            trigger: 'blur'
        }],
        securityCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
        },{
            pattern: /^[0-9]{6}$/,
            message: '请输入6位验证码',
            trigger: 'blur'
        }],
        password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        },{
            validator: passwordValidator,
            trigger: 'blur'
        },{
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur'
        },{
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '密码由英文字母和数字组成的6-12位字符',
            trigger: 'blur'
        }],
        passwordAgin: [{
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
        },{
            validator: passwordAginValidator,
            trigger: 'blur'
        }]
      }
    }
  },

  created() {
      vm.config.title('注册')
  },
  methods: {
    // 提交注册
    submit() {
      this.$refs.information.validate(valid => {
        if (valid) {
          if(!this.checked){
            this.$message({
              type: 'warning',
              message: '请勾选注册协议',
            })
            return false
          }
          this.information.password = md5(this.information.password)
          this.information.passwordAgin = md5(this.information.passwordAgin)
          vm.fetch
            .post('/account/register', { ...this.information })
            .then(data => {
              if (data && data.code === 200) {
                vm.$message({
                  type: 'success',
                  message: '注册成功，前往登录',
                  duration: 1500,
                  onClose: () => {
                    vm.$router.replace('/home/login')
                  }
                })
              }
            })
        }
      })
    },

    //设置验证码按钮文字的显示
    setTime() {
      if (this.IntervalId) {
        return
      }
      this.codenum = this.num + 's'
      this.IntervalId = setInterval(() => {
        this.num--
        this.flag = true
        this.codenum = this.num + 's'
        if (this.num == 0) {
          this.flag = false
          this.codenum = '获取验证码'
          clearInterval(this.IntervalId)
          this.num = 180
          this.IntervalId = null
        }
      }, 1000)
    },

    // 点击验证码
    codea(data) {
      if (!this.information.phoneNumber) {
        vm.$message.warning('请输入手机号码')
        return
      }
      if (this.information.phoneNumber) {
        this.setTime()
        vm.fetch.post(`/baseService/getCode/${this.information.phoneNumber}/open_register/0`)
        .then(
          data => {},
          err => {
            if (err && err.code === 598) {
              clearInterval(this.IntervalId)
              this.codenum = '获取验证码'
              this.IntervalId = null
              this.flag = false
              this.num = 180
            }
          }
        )
      }
    },

    // 上传头像监听
    success(val) {
      this.information.logo = val
    },
  }
}
</script>
<style lang="less" scoped>
.homeRegister {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  background: url('../../assets/img/bg.jpg') center center no-repeat;
  background-size: cover;
  padding-top: 10%;
  .registerBox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .el-form {
      width: 380px;
      height: 430px;
      padding-left: 30px;
      padding-right: 30px;
      border-radius: 20px;
      margin-right: 40%;
      padding-top: 30px;
      box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    }
    .kind {
      color: #666666;
      text-align: left;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .blue {
        color: #51c5ff;
      }
      h2 {
        font-size: 20px;
        display: inline-block;
        margin-top: 41px;
        line-height: 21px;
      }
      ul {
        display: inline-block;
        padding-left: 0;
        margin-top: 41px;
        li {
          list-style: none;
          float: left;
          font-size: 18px;
          line-height: 21px;
          margin-left: 50px;
          font-size: 20px;
        }
      }
    }
  }
  #fenlei {
    margin-bottom: 0;
  }
  .login {
    color: red;
  }
  .loginBtn {
    margin-right: 13px;
  }
  i {
    cursor: default;
    color: #000;
  }
}
</style>
<style lang="less">
.homeRegister {
  .el-radio-group {
    margin-top: 41px;
    margin-left: 52px;
    .el-radio__label {
      font-size: 20px;
      color: #666;
    }
  }
  .el-input__inner{
    background-color: transparent;
  }
  .el-form {
    .el-form-item {
      .el-form-item__content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        .upDownImg {
          height: 100px;
          display: flex;
          margin-bottom: 10px;
          justify-content: center;
           img {
            width: 100px;
            height: 100%;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
            cursor: pointer;
          }
        }
        img {
          height: 30px;
        }
        .check {
          padding-right: 10px;
        }
        .el-input {
          width: 220px;
          input {
            border: none;
            outline: none;
            border-bottom: 1px solid #e5e5e5;
            border-radius: 0;
          }
        }
      }
      .verify {
        border-color: #4db8fc;
        padding: 0;
        width: 97px;
        height: 34px;
        background-color: #4db8fc;
        border-radius: 5px;
        position: absolute;
        right: 30px;
        top: 0;
        color: #999;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 34px;
      }
    }
    .sign_in {
      text-align: center;
      display: flex;
      justify-content: sapce-between;
      button {
        width: 140px;
        height: 40px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 300;
      }
      .text{
        color: #979797;
        cursor: pointer;
      }
    }
    .login{
      text-align: right;
      margin: -15px 0 0 15px;
      p{
        width: 100%;
        color: #979797;
        i{
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
  }
}
</style>