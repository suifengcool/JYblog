<template>
  <div class='picture'>
    <div class="content-title">图片管理<Button type="primary"  round class="add" @click="add">新增图片</Button></div>
    <ul class="content_data_title">
      <li v-for="(item, index) in list" :class="{blue: changebill == index}" @click="redBill(index)" :key="index">{{item.name}}</li>
    </ul>
    <div class="table_content">
      <Table :data="data.list">
        <TableColumn prop="id" label="图片ID"/>
        <TableColumn prop="path" label="封面图" min-width="210">
          <template slot-scope="scope">
            <ImgView :src="scope.row.path" width="187.5" height="103.5"/>
          </template>
        </TableColumn>
        <TableColumn prop="path" label="图片的链接" />
        <TableColumn prop="type" label="图片类型" :formatter="pictureType"/>
        <TableColumn label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <Button type="primary" plain size="small" @click="edit(scope.row)">编辑</Button>
            <Button type="danger" plain size="small" @click="del(scope.row)" >删除</Button>
          </template>
        </TableColumn>
      </Table>
      <!-- 分页 -->
      <div class="pre_search">
        <MyPagination
          :page="data.pageNum"
          :pageSize="data.pageSize"
          :pageSizes="[10]"
          :total="data.total"
          :method='getData' />
      </div>
    </div>
    <div class="log">
      <Dialog :visible.sync="show" :append-to-body="true" class="dialog" :title=title @close="close">
        <Form :model="formOption" label-position="right" label-width="100px">
          <FormItem label="上传图片"  prop="path">
            <div class="img_box">
              <Avatar :defaultPic="formOption.path?formOption.path:'/static/admin.png'" width="333" height="180" @success="successFun" method="success"/>
            </div>
            <Tag type="danger" style="margin-top: 30px">封面图建议宽高比：1.8：1，建议尺寸：750px*414px</Tag>
          </FormItem>
          <FormItem  label="图片分类"  prop="type">
            <Select v-model="value" placeholder="请选择" @change='changeSelect(value)'>
              <Option
                v-for="item in titleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </Option>
            </Select>
          </FormItem>
        </Form>
        <div slot="footer" class="dialog-footer">
          <Button @click="hide">取消</Button>
          <Button type="primary" @click="save">确定</Button>
        </div>
      </Dialog >
    </div>

  </div>
</template>

<script>
  import { Button,Table,TableColumn,Input,Dialog,Form,Upload,FormItem,Tag,Select,Option} from 'element-ui';
  import Avatar from '../../components/Avaters.vue'
  import ImgView from '../../components/ImgView.vue'
  import MyPagination from "../../components/MyPagination.vue"
  import {pictureType} from '../../util/filter'
  export default {
    name: 'user',
    components: {
      Button,
      Table,
      TableColumn,
      Input,
      Dialog,
      Form,
      FormItem,
      Upload,
      Avatar,
      ImgView,
      Select,
      Tag,
      MyPagination,
      Option
    },
    data () {
      return {
        changebill: 0,
        title:null,
        show:false,
        value:null,
        list: [{pid: 0, name: '标题图'}, {pid:1, name: 'banner图'}, {pid: 2, name: '首页图'}],
        titleList: [{value:0, label: '标题图'}, {value:1, label: 'banner图'}, {value:2, label: '首页图'}],
        data:{
          pageNum: 0,
          pageSize:10,
          type: 0,
        },
        formOption:{
          path:null,
          type:null,
          id:null,
        },
        UserInfo:{},
        roles:[]
      }
    },

    created () {
      this.UserInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      console.log('this.UserInf:',this.UserInfo)
    },

    methods: {
      pictureType,
      close() {
        this.formOption = {
          path:null,
          type:null,
          id:null,
        }
      },
      redBill(index) {
        this.changebill = index
        this.data.type =index 
        console.log(1111);
        
        this.getData()
      },
      getData(){
        var obj = {
          page:　this.data.pageNum,
          pageSize:　this.data.page,
          type: this.data.type,
        }
        this.data.type = this.data.type ? this.data.type : this.changebill
        vm.fetch.get(`/pictures/list?page=${this.data.pageNum}&pageSize=${this.data.pageSize}&type=${this.data.type}`,).then(data=>{
          this.data = data
        })
      },
      // 新增
      add(){
        this.show=true
        this.title="新增"
        this.formOption={path:null,type:null,id:null}
      },
      changeSelect(value){
        this.data.type = value
      },

      // 编辑
      edit(row){
        this.show=true
        this.title="编辑"
        this.value = Math.abs(row.type)
        this.formOption = {...row}
        // this.formOption.type = Math.abs(row.type)
        console.log(row)
      },
//      保存
      save(){
        if(this.title === '编辑'){
          this.formOption.type = this.value
          vm.fetch.put(`/pictures/update`,{...this.formOption,userId: this.UserInfo.id}).then(data => {
            this.$message({
              message: '编辑成功',
              type: 'success'
            });
          })
        }else if(this.title === '新增'){
          this.formOption.type = this.value
          vm.fetch.post(`/pictures/add`,{...this.formOption,userId: this.UserInfo.id}).then(data => {
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          })
        }
        this.getData()
        this.show = false
      },

//      删除
      del(row){
        vm.fetch.delete(`/pictures/delete/${row.id}`).then(data => {
          this.getData()
        })
      },
      hide(){
        this.show=false
      },

      //获取图片
      successFun(data) {
        this.formOption.path=data;
      }
    }
  }
</script>
<style lang="less">
  .picture{

    .content-title{
      .add{
        position: relative;
        /*right:-75%;*/
      }
    }
    .content_data_title{
      height:70px;
      line-height: 70px;
      background-color: #fff;
      margin-bottom: 20px;
      padding-left: 30px;
      font-size: 20px;
      // color: #51c5ff;
      li{
        float: left;
        margin: 0 17px;
        color:#495869;
        cursor :pointer;
        &.ExportButton{
          float: right;
        }
      }
      .blue{
        color: #51c5ff;
        border-bottom: 3px solid #51c5ff;
      }
    }
    .table_content{
      text-align: center ;
    }

    .table_content thead th{
      text-align: center;
    }
  }
  .el-dialog{
    /*width:25% !important;*/
    .el-form{
      .el-form-item{
        .img_box {
          width: 100%;
          height: 180px;
        }
        .example {
          width: 150px;
          height: 120px;
          margin-top: 60px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }

    }
    .dialog-footer{
      text-align: center;
    }
  }

</style>

