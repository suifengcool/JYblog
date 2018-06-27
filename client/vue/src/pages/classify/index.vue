<template>
    <div class='classify mallClassifyGoods'>
		<div class="titleBox">
      <div class="content-title">分类设置</div>
      <Button plain icon="el-icon-plus" class="addClassify" type="primary" @click="addDad">添加主分类</Button>
    </div>
    <div id="all">
      <div class="title">
        <Row type="flex" align="middle" justify="center">
          <Col :span="5"><div class="titleInfo">分类名称</div></Col>
          <Col :span="5"><div class="titleInfo">创建时间</div></Col>
          <!-- <Col :span="4"><div class="titleInfo">分类图标</div></Col> -->
          <Col :span="5"><div class="titleInfo">更新时间</div></Col>
          <Col :span="5"><div class="titleInfo">操作</div></Col>
        </Row>
      </div>
      <!-- 主体部分 -->
      <div class="main" id="main">
        <Collapse accordion @change="changeStatus">
          <CollapseItem v-for="(item,index) in options" :key="index" :name="item.id">
            <template slot="title">
              <Row type="flex" align="middle" justify="center">
                <Col :span="5"><Input v-model.trim="item.name"  placeholder="请输入主分类名称" style="width:200px" @click.stop.native="xiaokeai"></Input></Col>
                <Col :span="5">
                  <div>{{detailTimeFilter(0,0,item.createTime)}}</div>
                </Col>
                <Col :span="5"><div>{{detailTimeFilter(0,0,item.updateTime)}}</div></Col>
                <Col :span="5">
                  <div>
                    <Button type="danger" plain size="middle" @click.stop.native="saveDad(item)">保存</Button>
                    <Button type="danger" plain size="middle" @click.stop.native="delDad(item)">删除</Button>
                  </div>
                </Col>
              </Row>
            </template>
            <div v-for="(ite,index) in optionss" class="sonClassify" :key="index">
              <Row type="flex" align="middle" justify="center">
                <Col :span="5"><Input v-model.trim="ite.name"  placeholder="请输入子分类名称" style="width:150px"></Input></Col>
                <Col :span="5">
                  <div>{{detailTimeFilter(0,0,ite.createTime)}}</div>
                </Col>
                <!-- <Col :span="5" style="display: flex;justify-content: center;">
                  <Avaters :url="ite.icon" @success="ite.icon = $event" :width="'40'" :height="'40'"/>
                </Col> -->
                <Col :span="5"><div>{{detailTimeFilter(0,0,ite.updateTime)}}</div></Col>
                <Col :span="5">
                  <div>
                    <Button type="danger" plain size="middle"  @click="saveSon(ite,item.id)">保存</Button>
                    <Button type="danger" plain size="middle" @click="delSon(item,ite)">删除</Button>
                  </div>
                </Col>
              </Row>
            </div>
            <div class="addSonClass">
              <Button plain icon="el-icon-plus" type="primary" @click="addSon(item)">添加子分类</Button>
            </div>
          </CollapseItem>
        </Collapse>
      </div>
    </div>
    </div>
</template>

<script>
import { Button,Row,Col,Collapse,CollapseItem,Input,MessageBox} from 'element-ui'
// import Avaters from "../../components/Avaters.vue"
import { detailTimeFilter} from "../../util/filter"
export default {
    name: 'classify',
    components: {
      // Avaters,
      Button,
      Row,
      Col,
      Collapse,
      CollapseItem,
      Input,
      MessageBox
    },
    data () {
		return {
       data: [],
        options:[],
        optionss:[],
        aaa:0,
        showData: [
          {
            classifyname: '',
            weight: null
          }
        ],
        activeNames: ['1'],
        inputVal: ''
    }
    },

    created () {
       this.init()
    },

    methods: {
     detailTimeFilter,
      handleChange(val) {
        console.log(val)
      },
      init(){
        vm.fetch.get("/classify/findchildren/0").then(res => {
          this.options=res;
          console.log(res);
        })
      },
      xiaokeai(){

      },
      changeStatus(res){
        if(res){
          vm.fetch.get(`/classify/findchildren/${res}`).then(res => {
          this.optionss=res;
          console.log(res,"xxx");
        })
        }else{
          this.optionss=[]
        }
      },
      saveSon(res,resID){
        var newAddDad={}
        if(res.id){
          newAddDad.id=res.id
          newAddDad.name = res.name
          vm.fetch.put("/classify/update",newAddDad).then(data => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.init()
            newAddDad={}
          })
        }else{
          console.log("新增")
          newAddDad.parentId=resID
          newAddDad.name = res.name
          // console.log("333333",newAddDad)
          vm.fetch.post("/classify/add",newAddDad).then(data => {
            this.$message({
              type: 'success',
              message: '新建成功!'
            });
            vm.fetch.get(`/classify/findchildren/${resID}`).then(res => {
              this.optionss=res;
              // console.log(res,"xxx");
           })
            newAddDad={}
          })
        }
      },
      saveDad(res){
        var newAddDad={}
        // stop
        if(res.id){
          console.log("修改")
          this.options.forEach((element,key) => {
            if(element.id==res.id){
              newAddDad.id=res.id
              newAddDad.name = this.options[key].name
            }
          })
          vm.fetch.put("/classify/update",newAddDad).then(data => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.init()
            newAddDad={}
          })
        }else{
          this.options.forEach((element,key) => {
            if(!element.id){
              // newAddDad.parentId=0
              newAddDad.name = this.options[key].name
            }
          })
          // console.log("333333",newAddDad)
          // addgoodsCategory(newAddDad).then((data)=>{ 
          vm.fetch.post("/classify/add",newAddDad).then(data => {
            this.init()
            this.$message({
              type: 'success',
              message: '新建成功!'
            });
            newAddDad={}

          })
          console.log("新增")
        }
      },
      addDad(){
        let newDad1={
          parentId:0,
          name:'',
        }
        this.options.unshift(newDad1)
        console.log(this.options,"asfsdf")
      },
      addSon(res){//子分类
        console.log(res,"子分类")
        let newSon1={
          parentId:res.id,
          name:'',
        }
        this.options.forEach((element,key) => {
          if(element.id==res.id){
            this.optionss.unshift(newSon1)
            console.log(this.options,'zifen')
          }
        })
      },
      delSon(item,ite){
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          vm.fetch.delete(`/classify/delete/${ite.id}`).then(data => {
           vm.$message({
              type: 'success',
              message: '删除成功!'   
            });
           vm.fetch.get(`/classify/findchildren/${item.id}`).then(res => {
              this.optionss=res;
              // console.log(res,"xxx");
           })
            // this.init()
        })
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delDad(res){
       MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
        vm.fetch.delete(`/classify/delete/${res.id}`).then(data => {
           vm.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.init()
        })
          // })

        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      }
}
</script>
<style lang='less' scoped>
  .mallClassifyGoods {
    .titleBox {
      position: relative;
    }
    .addClassify {
      position: absolute;
      top: 15px;
      right: 40px;
    }
  }
</style>
<style lang="less">
  .mallClassifyGoods{
    #all{
      .title{
        background-color: #f9fafb;
        .titleInfo{
          height: 70px;
          line-height: 70px;
          text-align:center;
        }
      }
      .main{
        background-color: #fff;
        // .el-collapse-item{
        //   .el-collapse-item__header{

        //   }
        // }
        .el-collapse-item__header{
          height:100px;
          line-height: 100px;
          position: relative;
          .el-collapse-item__arrow{
            position: absolute;
            left:70px;
            top:25px;
          }
          .is-justify-center{
            text-align:center;
          }
        }
        .el-collapse-item__content{
          padding-bottom: 0px;
          background-color: #f7f8fa;
          .sonClassify{
            .el-row{
              .el-col{
                .el-input{
                  &:nth-of-type(1){
                    // margin-left:52px;
                  }
                }
              }
            }
            height: 90px;
            line-height: 90px;
            .is-justify-center{
              text-align:center;
            }
          }
          .addSonClass{
            height: 90px;
            line-height: 90px;
            .el-button{
              margin-left:12.61%;
            }
          }
        }

      }
    }
  }
</style>