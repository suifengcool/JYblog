<template>
    <div class='user'>
       <div class="content-title">管理员列表<Button type="primary"  round class="add" @click="add">新增管理员</Button></div>
       <div class="table_content">
         <Table :data="option.list">
            <TableColumn prop="userName" label="账号"/>
            <TableColumn prop="roleName" label="角色" />
            <!-- <TableColumn prop="userImg" label="头像">
              <template slot-scope="scope">
                <span class="img_box"><img :src="scope.row.userImg" alt=""></span>
              </template>
            </TableColumn> -->
            <TableColumn prop="createTime" label="创建时间"/>           
            <TableColumn label="操作" width="240" fixed="right">
              <template slot-scope="scope">
                <Button type="primary" plain size="small" @click="edit(scope.row)">编辑</Button>
                <Button type="danger" plain size="small" @click="del(scope.row)">删除</Button>
              </template>
           </TableColumn>
         </Table>
         <MyPagination :page="option.page" :pageSize='option.pageSize' :total="option.total" :pageSizes=[10] :method="getUserList"></MyPagination>
        </div>
        <div class="log">
              <Dialog :visible.sync="dialogFormVisible" :append-to-body="true"  :center="true" class="user_log">
               <Form :model="formOption" label-position="right" label-width="80px" :rules="Rules" ref="formOption">
                 <FormItem label="账号">
                    <Input v-model="formOption.userName" disabled/>
                 </FormItem>
                 <FormItem label="新密码" prop="password">
                    <Input v-model="formOption.password" type="password"/>
                 </FormItem>                
              </Form> 
               <div slot="footer" class="dialog-footer">
                <Button @click="AddClear">取消</Button>
                <Button type="primary" @click="save">确定修改</Button>
               </div>
            </Dialog >
            <Dialog :visible.sync="addNumber" :append-to-body="true" :center="true" class="user_log">
               <Form :model="addOption" status-icon label-position="right" label-width="80px" :rules="FormRules" ref="addOption">
                 <FormItem label="账号" prop="userName">
                    <Input v-model="addOption.userName"  placeholder="请输入账号"/>
                 </FormItem>
                 <FormItem label="密码" prop="password">
                    <Input v-model="addOption.password" type="password" placeholder="请输入密码"/>
                 </FormItem>
                 <FormItem label="确认密码" prop="surePwd">
                    <Input v-model="addOption.surePwd" type="password" placeholder="请在次输入密码"/>
                 </FormItem>                
              </Form> 
               <div slot="footer" class="dialog-footer">
                <Button @click="AddClear">取消</Button>
                <Button type="primary" @click="addAcount">确定添加</Button>
               </div>
            </Dialog >
        </div>
        
    </div>
</template>

<script>
import Avaters from "../../components/Avaters.vue"
import MyPagination from "../../components/MyPagination.vue"
import { Button,Table,TableColumn,Input,Dialog,Form,FormItem,Select,Option,MessageBox} from 'element-ui';
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
      Avaters,
      MyPagination,
      Select,
      Option,
      MessageBox
    },
    data () {
		return {
      dialogFormVisible:false,
      addNumber:false,
      selectOption:[{ value:1, label: "超级管理员"}, {value:2, label: "管理员"}],
      formOption:{
        id:null,
        userName:null,
        password:null,
        roleName:null,
      },
      addOption:{
        userName:null,
        password:null,
        roleName:null,       
      },
      Rules:{
         password:[{
          required: true,
          trigger: 'blur' ,     
          validator:  (rule, value, callback)=>{
            if(!value){
                callback(new Error('请输入密码'));
            }else if(value.length<6){
              callback(new Error('密码不能少于6位'));
            }else{
               callback()
           }
           }
         }] 
      },
      FormRules:{
        password:[{ 
          required: true,
          validator:  (rule, value, callback)=>{
           if(!value){
              callback(new Error('请输入密码'));
           }else if(value.length<6){
             callback(new Error('密码不能少于6位'));
           } 
           else if(this.addOption.surePwd !== ''){
              this.$refs.addOption.validateField('surePwd');
           }
           callback() 
        },
        trigger: 'blur', }],
        surePwd:[ {
          required: true,
           validator: (rule, value, callback)=>{
            if (!value) {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.addOption.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            } 
        } , 
        trigger: 'blur' ,      
         }],
        userName:[{
          required: true,
          validator:(rule, value, callback)=>{
            if(!value){
               callback(new Error('请输入账号')); 
            }else{
              callback();
            }  
          },
          trigger: 'blur' ,
          }]
      },
      option:{
        page:1,
        pageSize:10,
        total:null,
        list:[]
      }
		}
    },
    created () {
    },

    methods: {
      getUserList(page={}){ //获取列表
        vm.fetch.get(`users/list?page=${page.page || 1}&pageSize=${page.pageSize || 10}`)
        .then(data=>{
          console.log(data,"aaa")
             this.option.page= data.pageNum
             this.option.total= data.total  
             this.option.list = data.list 
          }) 
        .catch(error=>{console.log(error,"error")}) 
      },

     edit(option){ //编辑
       this.dialogFormVisible = true;
       this.formOption = option;
       this.formOption.password = ""
     },

     del(option){ //删除
       MessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
          })
          .then(()=>{
              var id = option.id
              vm.fetch.delete(`/users/delete/${id}`) 
              .then(data=>{
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getUserList()
              }) 
          })    
     },

     save(){ //编辑
      this.$refs.formOption.validate((valid)=>{
      if(valid){
          var opt = {}
          opt.id = this.formOption.id
          opt.password = this.formOption.password
          opt.userName = this.formOption.userName
          vm.fetch.post('/users/update',opt)
          .then(result=>{
            if(result.resultCode == 200){
                this.$message({
                    message: '编辑成功',
                    type: 'success'
                });
                this.dialogFormVisible = false;
                this.formOption={}
                this.getUserList()
              }
            })
          .catch(error=>{console.log("error")})  
         } 
      })
 
     },
     add(){
       this.addNumber = true;      
     },
     addAcount(){ //添加用户
       this.$refs.addOption.validate((valid)=>{
          if(valid){
           var params = {}
            params.userName=this.addOption.userName,
            params.password=this.addOption.password,
            // params.roleName=this.addOption.roleName.toString(),
            vm.fetch.post(`/users/add`,params)
            .then(result=>{
              if(result.resultCode == 200){
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  });
                 this.addNumber = false; 
                 this.addOption = {}
                 this.getUserList()
              }    
            })
            .catch(error=>{console.log(error)})
          }else{
            return false
          }  
        })
     },
     AddClear(){
       this.addOption = {};
       this.formOption = {};
       this.addNumber = false;
       this.dialogFormVisible = false;
       this.$refs.formOption.clearValidate()
       this.$refs.addOption.clearValidate()
     } 
	}
}
</script>
<style lang="less">
  .user_log{
    .el-dialog{
      width: 350px;
    }
    .avatar_box{
      position: relative;
      margin:auto;
    }
  }
  .user{
      .el-pagination{
         background-color: #fff; 
         padding:20px;
      }
      .table_content{
       text-align: center;
       .img_box{
         width: 80px;
         height: 80px;
         display: inline-block;
         img{
           width:100%;
           height:100%;
         }
       }
     }
     .table_content thead th{
       text-align: center;
     }
    .el-dialog__wrapper{
        .el-dialog{
          width:25% !important;
       }
       .dialog-footer {
         text-align: center;
       }         
      }
  }
</style>

<style lang='less' scoped>

</style>