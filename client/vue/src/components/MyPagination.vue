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
    method: Function,
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10]
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    sync: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      if (!pageSize) {
        return
      }
      this.sync &&
        this.$router.replace({ query: { ...this.$route.query, pageSize } })
      this.method && this.method({ page: this.page, pageSize })
    },
    handleCurrentChange(page) {
      if (!this.pageSize) {
        return
      }
      this.sync &&
        this.$router.replace({ query: { ...this.$route.query, page } })
      this.method && this.method({ page, pageSize: this.pageSize })
    }
  },
  created: function() {
    const {
      page = this.page || 1,
      pageSize = this.pageSize || this.pageSizes[0]
    } = this.sync ? this.$route.query : {}
    this.method && this.method({ page: page * 1, pageSize: pageSize * 1 })
  }
}
</script>
