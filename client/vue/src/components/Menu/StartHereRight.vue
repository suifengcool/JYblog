<template>
  <div class="StartHereRight">
    <div class="header-img">
      <span>
        <DropdownItem class="clearfix" >
        <!-- <i class="el-icon-message"></i> -->
        <!-- <Badge class="mark" :value="UnreadLength" /> -->
      </DropdownItem>
      </span>
      <span><img src='../../assets/img/head.png' onerror="javascript:this.src='../../assets/img/head.png';"/></span>
      <span>{{data.name}}</span>
      <span>
        <Tooltip class="item" effect="dark" content="退出登录" placement="bottom-start">
          <i class="iconfont icon-dianyuan" @click="quit"></i>
        </Tooltip>
      </span>
    </div>
  </div>
</template>
<script>
import {Badge,DropdownItem,Icon,Tooltip} from 'element-ui'
export default {
  name:'StartHereRight',
  components:{Badge,DropdownItem,Icon,Tooltip},
  data(){
    return {
      UnreadLength: "3"
    };
  },

  props:{
    data: {
      type: Object,
      default: {},
    }
  },

  methods:{
    quit(){
      window.localStorage.removeItem('userInfo');
      vm.$router.replace('/')
    }
  }
}
</script>
<style lang="less" scope>
  .StartHereRight{
    position: fixed;
    top: 0;
    left: 470px;
    right: 0;
    height: 70px;
    line-height: 70px;
    background-color: #303246;
    font-size: 22px;
    z-index: 99;
  }
</style>
<style lang="less">
.StartHereRight {
  .header-img {
    float: right;
    height: 100%;
    .el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:not(.is-disabled):hover {
      background: none;
      color: #b2b2b2;
    }

    span {
      display: inline-block;
      height: 70px;
      position: relative;
      float: left;
      margin-right: 17px;
      color: #fff;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        margin: auto;
        border-radius: 50%;
      }
    }
    span:nth-child(1) {
      margin-right: 0;
      .el-dropdown-menu__item {
        padding: 0;
        // margin-top: 23px;
        // position: relative;
        .el-icon-message {
          font-size: 24px;
          cursor: pointer;
        }
        .el-badge {
          top: -10px;
          left: -14px;
          .el-badge__content{
            cursor: pointer;
          }
        }
      }
     .el-dropdown-menu__item:focus{
      outline:none;
      }
    }
    span:nth-child(2) {
      width: 44px;
      height: 44px;
      margin-top: 13px;
      position: relative;
      img{
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
    span:nth-child(3) {
      font-size: 16px;
    }
    span:nth-child(4) {
      .iconfont{
        padding: 0 10px 0 10px;
        border-left: 1px solid #b2b2b2;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
