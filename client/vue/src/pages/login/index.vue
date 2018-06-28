<template>
    <div class='home-login'>
        <Form class="login" :rules="rules" ref="loginForm" :model="form" status-icon>
            <div class="panfish">
                <img v-if="imgType == 1" class="normal" src="https://gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png" alt="">
                <img v-if="imgType == 2" class="greeting" src="https://gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" alt="">
                <img v-if="imgType == 3" class="blindfold" src="https://gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png" alt="">
            </div>
            <h3>登录</h3>
            <FormItem label=""   prop="userName">
                <Input type="text" class="userNameInput" v-model="form.userName" auto-complete="off" prefix-icon="Icon-date" placeholder="Username" size="medium" @focus="focus(2)" @blur="imgType = 1"/>
            </FormItem>
            <FormItem  label=""  prop="password">
                <Input type="password" v-model="form.password" auto-complete="off" prefix-icon="Icon-date" placeholder="Password" size="medium" @focus="focus(3)" @blur="imgType = 1"/>
            </FormItem>
            <FormItem  label=""  class="register">
                <p>没有账号？<i @click="$router.push('/register')">前去注册</i></p>
            </FormItem>
            <div class="btn">
                <Button class="active" @click="submit">登录</Button>
                <Button @click="$router.push('/')">回到首页</Button>
            </div>
        </Form>
    </div>
</template>

<script>
import { Button,Form,FormItem,Input} from 'element-ui'
export default {
    name: 'notFound',
    components: {
    	Button,
        Form,
        FormItem,
        Input
    },
    data () {
		return {
            imgType: 1,
            form:{
                userName: '',
                password: ''
            },
            rules: {
                userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
		}
    },

    created () {
        vm.config.title('登录')
    },

    methods: {
        focus(index){
            this.imgType = index
        },

        submit() {
            this.$refs.loginForm.validate(val => {
                if(val){
                    vm.fetch.post('/user/login',this.form).then(data=>{
                        console.log('data:',data)
                        if(data && data.resultCode === 200){
                            vm.$message({
                                type: 'success',
                                message: '登录成功',
                                duration: 1000,
                                onClose: () => {
                                    window.localStorage.setItem('userInfo', JSON.stringify(data.data.currentUser))
                                    vm.$router.push('/article')
                                }
                            })
                        }
                    })
                }
            })
        },
	}
}
</script>
<style lang='sass' scoped>
.home-login
    height: 100vh
    background: url('../../assets/img/bg.jpg') center center no-repeat
    background-size: 120%
    font-size: 14px
    .login
        position: absolute
        top: 45%
        left: 45%
        margin: -160px 0 0 -160px
        width: 320px
        height: 320px
        padding: 36px
        box-shadow: 0 0 100px rgba(0, 0, 0, 0.08)
        img
            width: 120px
            position: absolute
            top: 10px
            left: 50%
            z-index: 1
        .normal
            transform: translate(-50%,-83%)
        .greeting
            transform: translate(-50%,-75.8%)
        .blindfold
            transform: translate(-50%,-75%)

</style>
<style lang="sass">
    .home-login
        h3
            height: 40px
            line-height: 40px
            margin-bottom: 24px
            color: #666
            font-size: 16px
        .btn
            display: flex
            justify-content: space-between
            button
                width: 104px

        .el-input--prefix .el-input__inner
            padding-left: 10px
        .register
            margin: -15px 0 5px 0
            p
                text-align: right
                color: #979797
                i 
                    color: #409EFF
                    cursor: pointer
</style>