<template>
    <div class='videomanage content'>
      <div class="content-title">视频列表<Button type="primary"  round @click="newput"><i class="iconfont icon-jiahao"></i>新建视频</Button></div>
      <div class="table_content">
        <Table :data="data.list">
          <TableColumn prop="name" label="视频名称"/>
          <TableColumn prop="videoUrl" label="视频地址" />
          <TableColumn prop="createTime" label="创建时间"/>
          <TableColumn label="操作" width="240" fixed="right">
            <template slot-scope="scope">
              <Button type="primary" plain size="small" @click="edit(scope.row)">编辑</Button>
              <Button type="danger" plain size="small" @click="del(scope.row.id)">删除</Button>
            </template>
          </TableColumn>
        </Table>
      </div>
        <Dialog :visible.sync="dialogFormVisible" :append-to-body="true" custom-class="dialogone">
          <Form :model="formOption" label-position="right" label-width="80px" ref="ruleForm" :rules="FormRules">
            <FormItem label="视频名称"  prop="name">
              <Input v-model="formOption.name"/>
            </FormItem>
           <FormItem label="分类" prop="classifyId">
                                  <Cascader
                                      :options="options2"
                                      @active-item-change="handleItemChange"
                                      :props="props"
                                      v-model="formOption.classifyId"
                                  ></Cascader>
            </FormItem>
            <FormItem label="上传视频">
              <Col :span="24">
                <div class="uploadimgShow">
                  <UploadFile :defaultPic="formOption.videoUrl" method="success2" width='100%' height="180" @success2="successIdCardBack2" ref="videPload"></UploadFile>
                </div>
              </Col>
            </FormItem>
          </Form>
          <div slot="footer" class="dialog-footer">
          <Button @click="dialogFormVisible = false">取消</Button>
          <Button type="primary" @click="save">确定</Button>
          </div>
        </Dialog >

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
</template>

<script>
import {
  Button,
  Carousel,
  CarouselItem,
  Icon,
  Row,
  Col,
  Input,
  DatePicker,
  Table,
  TableColumn,
  Card,
  Dialog,
  Form,
  FormItem,
  Select,
  Option,
  Cascader,
  MessageBox
  } from 'element-ui';
import MyPagination from '../../components/MyPagination.vue'
import UploadFile from '../../components/UploadFile.vue'
export default {
    name: 'videomanage',
    components: {
      Button,
      CarouselItem,
      Icon,
      Carousel,
      Row,
      Col,
      Input,
      DatePicker,
      Table,
      TableColumn,
      Card,
      MyPagination,
      Dialog,
      Form,
      FormItem,
      Select,
      Option,
      UploadFile,
      Cascader,
      MessageBox
    },
    data () {
		return {
      value5: "",
      title: '新建',
      options2: [],
      props: {
        value: 'label',
        children: 'cities'
        },
      seek:{
        page: 1,
        pageSize: 8,
        topicsName: null,//搜索
      },
      data:{
        pageNum:1,
        pageSize:10,
        total:null,
        list:[],
      },
      formOption: {
        acount: '',
        videoUrl: ''
      },
      dialogFormVisible: false,
      value: '',
      FormRules: {
        name: [{ required: true, message: '请输入视频名称', trigger: 'blur' }],
        classify: [{ required: true, message: '请输入正确的邮箱地址', trigger: ['blur'] }],
        content: [{ required: true, message: '请输入正确的邮箱地址', trigger: ['blur'] }],
      },
      option:{
        list:[
          {acount:15827605599,url:'http://www.baidu.com',password:'......',createTime:'2018.5.6',id:1},
          {acount:15827605599,url:'http://www.baidu.com',password:'......',createTime:'2018.5.6',id:2},
          {acount:15827605599,url:'http://www.baidu.com',password:'.....',createTime:'2018.5.6',id:3},
          {acount:15827605599,url:'http://www.baidu.com',password:'......',createTime:'2018.5.6',id:4},
        ]
      }
		}
    },

     created () {
           // /classify/findchildren/{id}
           this.$confirm = MessageBox.confirm
           // /{id}findchildren/{id}
           vm.fetch.get('/classify/findchildren/0').then(result=>{
               // result
               console.log("数据",result);
               result.forEach(element => {
                   if (element.type == 1) {
                       var obj = {
                           ids: element.id,
                           value: element.id,
                           label: element.name,
                           cities: []
                       }
                   }else{
                       var obj = {
                           ids: element.id,
                           value: element.id,
                           label: element.name,
                           cities: []
                       }
                   }
                   this.options2.push(obj)
               });
               console.log("结果",this.options2);
               this.options2.forEach((item,index)=>{
                    console.log("结果",this.options2);
                   if ( !this.options2[index].cities.length) {
                       vm.fetch.get(`/classify/findchildren/${item.ids}`).then(result=>{

                           // result
                           console.log("数据",result);
                           if (result.length<=0) {
                               return
                           }
                           // this.options2[index].cities = []
                           result.forEach(element => {
                               let obj = {
                                   id: element.id,
                                   value: element.id,
                                   label: element.name,
                                   // cities: []
                               }
                               console.log(999,element);
                               let uid = element.id
                               if (element.id) {
                                   vm.fetch.get(`/classify/findchildren/${uid}`).then(resultl=>{

                                       resultl.forEach(itm=>{
                                           let objs = {
                                               id: element.id,
                                               value: element.id,
                                               label: element.name,
                                               // cities: []
                                           }

                                           obj.cities.push(objs)
                                       })
                                       if (resultl.length <= 0) {
                                           // obj.cities = []
                                           delete obj.cities
                                       }
                                   })
                               }
                               this.options2[index].cities.push(obj)
                           });
                           console.log("结果",this.options2);
                       })
                   }
               })

           })
           this.formOption.classifyId = null
           // this.userId = localStorage.getData
           var userInfo= JSON.parse(localStorage.getItem('userInfo'));
           console.log(66666666666666,userInfo);

           this.userId = userInfo.id
       },
    methods: {

      handleItemChange(val) {
           console.log('active item:', val);


      },
      // 新建
      newput(){
        this.dialogFormVisible = true
        this.title = '新建'
        console.log(this.title)
         this.formOption = {}
         this.formOption.videoUrl = ''
        this.formOption.classifyId = []
        // var
        var obj = this.$refs
        console.log(
          this.$refs.videPload
        );

        // this.$refs.videUpload.$emit('clearUrl')
      },
      edit(data) {
        this.dialogFormVisible = true
        this.title = '编辑'
        this.formOption = {}
        this.formOption.classifyId = []
            if (data) {
                this.formOption = {...data,classifyId:[]}
                console.log(data.id)
            }
        },
     save() {
          this.dialogFormVisible = false
          console.log(this.title)
          console.log('data',JSON.parse(window.localStorage.getItem('userInfo')))
          let user = JSON.parse(window.localStorage.getItem('userInfo')).id
          console.log(this.formOption.videoUrl )
          //新建
          if(this.title == '新建')
          {
            this.$refs.ruleForm.validate((val)=>{
              if(val){
                vm.fetch.get(`/classify/list`).then(result=>{
                      // result
                      result.list.forEach(item=>{
                        if (item.name == this.formOption.classifyId[this.formOption.classifyId.length-1]) {
                            vm.fetch.post(`video/add`,{name:this.formOption.name, videoUrl:this.formOption.videoUrl,createTime:null,updateTime:null,userId:user,classifyId:item.id}).then(res=>{
                          if(res && res.resultCode == 200){
                                  console.log(99999999999999999);
                                  vm.$message({
                                      type: 'success',
                                      message: '新增成功',
                                      duration: 1000
                                  })
                                  this.dialogFormVisible = false
                                  this.formOption = {}
                                  this.getData()
                              }

                            })
                        }
                      })
                })

              }
            })
          }
          //编辑
          else{
            this.$refs.ruleForm.validate((val)=>{
              if(val){
                vm.fetch.get(`/classify/list`).then(result=>{
                      // result
                      result.list.forEach(item=>{
                        if (item.name == this.formOption.classifyId[this.formOption.classifyId.length-1]) {
                            vm.fetch.put(`video/update`,{name:this.formOption.name, videoUrl:this.formOption.videoUrl, userId:user,id:this.formOption.id,createTime:this.formOption.createTime,updateTime:null,}).then(res=>{

                                if(res && res.resultCode == 200){
                                  console.log(99999999999999999);
                                  vm.$message({
                                      type: 'success',
                                      message: '编辑成功',
                                      duration: 1000
                                  })
                                  this.dialogFormVisible = false
                                  this.formOption = {}
                                  this.getData()
                              }
                             })
                        }
                      })
                })

              }
            })
          }
     },
     getData(pagedata){
        vm.fetch.post(`/video/list`,{
          page:　pagedata?pagedata.page:this.data.pageNum,
          pageSize:　10
        }).then(data=>{
          this.data.list = data.list
          this.data.pageNum = data.pageNum
          this.data.pageSize = data.pageSize
          this.data.total = data.total

      })
     },
     successIdCardBack2(val) {
       this.formOption.videoUrl = val
       console.log('val',this.formOption.videoUrl )
     },
    del(id) {
          MessageBox.confirm(`你删除?`, 'warning', '取消确认')
    .then(() =>
        vm.fetch.delete(`/video/delete/${id}`)
        .then(res=>{
            if(res && res.resultCode === 200){
                vm.$message({
                    type: 'success',
                    message: '删除成功',
                    duration: 1000
                })
               this.getData()
            }
        })
        .catch(({ msg }) => error(msg || '取消失败！请稍后重试...'))
    )
  }
  }
}
</script>
<style lang='sass' scoped>
  .videomanage
    .content-title
      display: flex
      justify-content: space-between
      padding-right: 26px
      align-items: center
    .time_search
      height: 74px
      line-height: 74px
      background-color: #fff
      font-size: 18px
      display: flex
      align-items: center;
      margin-bottom: 20px
</style>
<style lang="sass">
.videomanage
  .el-date-editor--datetimerange.el-input__inner
    width: 100%
  .el-date-editor .el-range-separator
    padding: 0px
  .search
    height: 74px
    display: flex
    align-items: center
    background-color: #fff
    padding-left: 30px
    .el-input
      width: 276px !important
      .el-input__inner
        font-size: 16px;
        height: 46px;
    .el-input__inner
      border-radius: 20px !important;
  .block
    margin-left: 40px
    .el-date-editor
      width: 400px
      height: 46px
      border-radius: 20px
      .el-range-input
        font-size: 16px
    .el-range-separator
      width: 10%
    .el-button
      font-size: 16px
      margin-left: 10px !important
  .offlind_card
    .row-bg
      .el-card__body
        padding: 0 12px 20px
.dialogone
  width: 600px !important;
</style>


