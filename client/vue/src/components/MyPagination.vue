<template>
  <Pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    @next-click='handleCurrentChange'
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </Pagination>
</template>
<script>
import { Pagination } from 'element-ui'
export default {
  name: 'MyPagination',
  components:{
    Pagination
  },
  props: {
    method: Function,                               //定义的方法
    pageSize: {type: Number, default: 10},          //每条页数
    pageSizes: {type: Array,default: () => [10]},   //可选的每条页数
    page: { type: Number, default: 1 },             //当前页数
    total: {type: Number, default: 0},              //总条数
    sync: {type: Boolean, default: true}            //是否同步
  },
  methods: {
    //更改每页条数
    handleSizeChange(pageSize) {
      if (!pageSize) {
        return
      }
      this.sync && this.$router.replace({ query: { ...this.$route.query, pageSize } })
      this.method && this.method({ page: this.page, pageSize })
    },
    //更改当前页数
    handleCurrentChange(page) {
      if (!this.pageSize) {
        return
      }
      this.sync && this.$router.replace({ query: { ...this.$route.query, page } })
      if(page ==1 ){
        this.$router.replace({ query: { ...this.$route.query, page:1} })
      }
      this.method && this.method({ page, pageSize: this.pageSize })
    }
  },
  created: function() {
    const {
      page = this.page || 1,
      pageSize = this.pageSize || this.pageSizes[0]
    } = this.sync ? this.$route.query : {}
    this.method && this.method({ page: page * 1, pageSize: pageSize * 1 })
  },
  watch:{
    page: function(newVal,oldVal){
      if(newVal == 1){
        this.$router.replace({ query: { ...this.$route.query, page:1 } })
      }
    }
  }
}
</script>
<style lang="less">
.el-pagination {
  .el-pager {
    margin: 0 10px;
    li {
      background-color: transparent;
    }
  }
  > .btn-prev {
    padding-right: 0px;
    min-width: 28px;
  }
  > .btn-next {
    padding-left: 0px;
    min-width: 28px;
  }
  button {
    padding: 0;
    border-radius: 50%;
  }
  .el-select>.el-input>.el-input__inner {
    border-radius: 17px !important;
    border: solid 1px #d2d7dc;
    line-height: 28px;
  }
  .el-pagination__editor.el-input .el-input__inner {
    border-radius: 17px !important;
    border: solid 1px #d2d7dc;
    line-height: 28px;
  }
}
</style>
