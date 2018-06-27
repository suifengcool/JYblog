<template>
  <div class="navBar-item">
    <MenuItem :index="item.url" v-if="!item.children" @click="select">
      <span v-if="true || !hide">{{item.name}}</span>
    </MenuItem>
    <Submenu :index="index" v-if="item.children">
      <template slot="title">
        <span v-if="true || !hide" @click="select({index:item.url})">{{item.title}}</span>
        </template>
      <NavItem v-for="(i,idx) in item.children" :hide="hide" :key="index+'-'+idx" :index="index+'-'+idx" :item="i"/>
    </Submenu>
  </div>
</template>
<script>
import { Submenu, MenuItem } from 'element-ui'
export default {
  name: 'NavItem',
  components: { Submenu, MenuItem },
  props: {
    index: String,
    item: Object,
    hide: Boolean
  },
  methods: {
    select({ index }) {
      // console.log(this.item,666)
      if (this.item.id!=100 || this.item.id!=101) {
        this.$router.push({ path: '/home/detail/'+this.item.id,query:{id:this.item.id}})
      }
      if (index) {
        this.$router.push({ path: index })
      }
    }
  }
}
</script>