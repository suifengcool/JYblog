<template>
    <div class="header-contain">
        <div class="header w-1200">
            <h3>SuiFeng</h3>
            <ul>
                <router-link 
                    v-for="(item,index) in NavList" 
                    :key="item.id" 
                    :class="{'active': $route.path == item.url}" 
                    :to="item.url"
                >
                    {{item.name}}
                </router-link>
            </ul>
            <!-- <div class="user-box">
                <img src="" alt="">
                <span>许刚</span>
            </div> -->
            <div class="login" @click="$router.push('/login')">登录</div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            NavList: [{
                id: 1,
                name: '首页',
                url: '/'
            },{
                id: 2,
                name: 'Demo',
                url: '/demo'
            },{
                id: 3,
                name: '组件',
                url: '/componet'
            },{
                id: 4,
                name: '关于',
                url: '/about'
            }],
        }
    }
}
</script>

<style lang="sass">
.header 
    height: 50px
    line-height: 50px
    display: flex
    justify-content: space-between
    h3
        margin-right: 30px
        font-size: 24px
        color: #e70012
    ul
        display: flex
        flex: 1
        a
            margin-left: 10px 
            position: relative
            padding: 0 15px
            display: inline-height
            &::before
                content: ""
                position: absolute
                top: -2px
                left: 100%
                width: 0
                height: 100%
                border-bottom: 2px solid #e70012
                transition: 0.2s all linear
            &:hover
                cursor: pointer
            &:hover::before
                width: 100%
                left: 0
            &:hover ~ li::before
                left: 0
        .active
            color: #e70012
            posiion: relative
            &:after
                position: absolute
                content: ''
                bottom: 0
                left: 0
                width: 100%
                display: inline-block
                height: 2px
                background: #e70012
    .login
        width: 60px
        height: 30px
        line-height: 30px
        border: 1px solid #dedede
        border-radius: 5px
        text-align: center
        margin-top: 10px
        cursor: pointer
        &:hover
            color: #e70012
            border-color: #e70012
</style>