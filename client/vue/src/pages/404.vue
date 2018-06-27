<template>
    <div class='not_found'>
        <div class="found">
            <div class="shuzi">
                <img src="../assets/img/404/shuzi_404.png" alt="">
            </div>
            <div class="katong">
                <img src="../assets/img/404/katong_404.png" alt="">
                <p>Sorry,您访问的页面不存在哦...</p>
            </div>
            <div class="btn">
                <Button type="primary" round @click="go(0)">返回系统首页</Button>
                <Button type="danger" round @click="go(1)">返回继续操作</Button>
            </div> 
        </div>
    </div>
</template>

<script>
import { Button} from 'element-ui';
export default {
    name: 'notFound',
    components: {
        Button
    },
    data () {
        return {
        }
    },

    created () {
    },

    methods: {
        // 跳转 type为0，表示回系统首页，1表示返回上一级
        go(type){
            let path = '/'
            if(type){
                window.history.go(-1)
            }else{
                this.$router.push({path: path})
            }
        }
    }
}
</script>
<style lang='sass' scoped>
.not_found
    width: 608px
    height: 390px
    margin: 0 auto
    text-align: center
    margin-top: 165px
    .shuzi
        width: 100%
        text-align: center
    .katong p
        margin: 20px 0
</style>