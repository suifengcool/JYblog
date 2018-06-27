<template>
  <div class="StartHere">
    <div class="logo">
      <div class="imgBox">
        <!-- <img src="../../../static/img/logo_xxb.png" alt="LOGO" @click="goHome"> -->
        <h3>后台管理系统</h3>
      </div>
      <StartHereRight :data="data"/>
    </div>
    <Menu :default-active="active" unique-opened id="menu">
      <SidebarItem :index="idx+''" :item="item" v-for="(item,idx) in menus" :key="idx"/>
    </Menu>
  </div>
</template>

<script>
import StartHereRight from './StartHereRight'
import SidebarItem from './SidebarItem'
import {Menu,Submenu,MenuItem,MenuItemGroup} from 'element-ui'
import bus from "../../util/bus.js";
export default {
  components:{
    StartHereRight,
    SidebarItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup
  },

  data(){
    return {
      menus: [],
      data: {
        logo: '',
        name: ''
      }
    }
  },

  computed: {
    active() {
      let path = this.$route.path
      return path
    },
  },

  created(){

    bus.$on('getMenus', target => {
      this.menus = target
    });

    this.menus = [{
      "deleted":0,
      "icon":"icon-home",
      "id":"",
      "name":"文章管理",
      "num":"0",
      "pid":"0",
      "url":"/article",
      "children":[]
    },{
      "deleted":0,
      "icon":"icon-weibiaoti5",
      "id":"",
      "name":"图片管理",
      "num":"0",
      "pid":"0",
      "url":"/picture",
      "children":[]
    },{
      "deleted":0,
      "icon":"icon-weibiaoti5",
      "id":"",
      "name":"分类管理",
      "num":"0",
      "pid":"0",
      "url":"/classify",
      "children":[]
    },{
      "deleted":0,
      "icon":"icon-weibiaoti5",
      "id":"",
      "name":"视频管理",
      "num":"0",
      "pid":"0",
      "url":"/video",
      "children":[]
    },{
      "deleted":0,
      "icon":"icon-weibiaoti5",
      "id":"",
      "name":"管理员列表",
      "num":"0",
      "pid":"0",
      "url":"/user",
      "children":[]
    }]

    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))

    // this.data.logo = userInfo.logo
    this.data.name = userInfo.userName
  },

  methods: {}
}
</script>
<style lang="less" scope>
.StartHere {
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 230px;
  background-color:#303246;
  .logo{
    position: fixed;
    top: 0;
    left: 10px;
    width: 100%;
    height: 70px;
    line-height: 70px;
    background-color:#303246;
    display: flex;
    justify-content: space-between;
    .imgBox{
      display: flex;
      position: relative;
      p{
        font-size: 10px;
        color: #dedede;
        position: absolute;
        bottom: -20px;
        left: 50px;
      }
      h3{
        font-size: 24px;
        color: #dedede;
      }
      img {
        cursor: pointer;
        width: 140px;
        height: 35px;
        margin-top: 17.5px;
        margin-right: 80px;
      }
    }

  }

}


</style>
<style lang="less">
#menu{
  transition: all .3s ease;
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0;
  background-color: #303246;
}
</style>
