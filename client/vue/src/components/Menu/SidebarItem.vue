
<template>
  <div class="sidebar-item">
    <MenuItem :index="item.url || (item.code||index)" v-if="!item.children || item.children.length == 0" @click="select">
      <i class="icon-font iconfont" :class="item.icon||'el-icon-date'" ></i><span>{{item.name}}</span>
    </MenuItem>
    <Submenu :index="index" v-if="item.children && item.children.length >0">
      <template slot="title" ><i class="icon-font iconfont" :class="item.icon ||'el-icon-menu'"></i><span>{{item.name}}</span></template>
      <SidebarItem v-for="(i,idx) in item.children" :key="index+'-'+idx" :index="index+'-'+idx" :item="i"/>
    </Submenu>
  </div>
</template>

<script>
import { Menu, Submenu, MenuItem, MenuItemGroup } from "element-ui";
export default {
  name: "SidebarItem",
  props: {
    index: String,
    item: Object
  },
  components: { Menu, Submenu, MenuItem, MenuItemGroup },
  data() {
    return{

    }
  },
  methods: {
    select({ index }) {
      if (index.startsWith("http://") || index.startsWith("https://")) {
        location.href = index;
      } else {
        this.$router.push({ path: index });
      }
    }
  }
};
</script>

<style lang="less">
.el-menu{
.sidebar-item {
  text-align: left;
  overflow: hidden;
  .icon-font {
    vertical-align: middle;
    margin-right: 10px;
    position: relative;
    font-size: 20px;
  }
  .el-menu-item, .el-submenu__title {
    padding: 0;
    background-color: #303246;
    color: #909aa3;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    &:hover {
      i {
        color:#fff;

      }
      color: #fff;
      background-color: #51c5ff;
    }
    &.is-active {
      background-color: #51c5ff;
    }
  }
  .el-submenu.is-active > .el-submenu__title {
    i {
      color: #ffffff;
      background-color: #51c5ff;
    }
    background-color: #51c5ff;
    color: #fff;
  }
}
}
</style>
