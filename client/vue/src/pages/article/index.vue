<template>
    <div class='article'>
        <div class="content-title">文章管理<Button type="primary"  round class="add" @click="edit()">新增文章</Button></div>

        <div class="table_content" style="background:#fff;padding-bottom:20px">
            <Table :data="dataList">
                <TableColumn prop="title" label="标题"/>
                <TableColumn prop="classifyName" label="类别" />
                <TableColumn prop="content" label="内容简介" min-width='300'>
                    <template slot-scope="scope">
                        <span v-html="scope.row.content"></span>
                    </template>
                </TableColumn>
                <TableColumn prop="createTime" label="创建时间"/>
                <TableColumn prop="updateTime" label="更新时间"/>
                <TableColumn prop="user" label="发布人"/>
                <TableColumn label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                        <Button type="primary" plain size="small" @click="edit(scope.row)">编辑</Button>
                        <Button type="danger" plain size="small" @click="del(scope.row.id),scope.$index" >删除</Button>
                    </template>
                </TableColumn>
            </Table>
            <!-- 分页 -->
            <div class="pre_search" style="background:#fff;padding:20px">
                <MyPagination
                    :page="data.pageNum"
                    :pageSize="data.pageSize"
                    :pageSizes="[10]"
                    :total="data.total"
                    :method='getData' />
            </div>
        </div>

        <div class="dialog">
            <Dialog :visible.sync="dialogFormVisible" :append-to-body="true"  :center="true">
                <Form :model="formOption" label-position="right" label-width="80px" :rules="FormRules">
                    <FormItem label="标题" prop="title">
                        <Input v-model="formOption.title"/>
                    </FormItem>
                    <FormItem label="分类" prop="classifyId">
                        <Cascader
                            :options="options2"
                            @active-item-change="handleItemChange"
                            :props="props"
                            v-model="formOption.classifyId"
                        ></Cascader>
                    </FormItem>
                    <FormItem label="文章内容" prop="content">
                        <vue-editor v-model="formOption.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
                    </FormItem>
                </Form>
                <div slot="footer" class="dialog-footer">
                    <Button @click="dialogFormVisible=false">取消</Button>
                    <Button type="primary" @click="save">确定</Button>
                </div>
            </Dialog >
        </div>


    </div>
</template>

<script>
import { Button,Table,TableColumn,Dialog,Form,FormItem,Input,Cascader,MessageBox} from 'element-ui';
import MyPagination from "../../components/MyPagination.vue"
import { VueEditor } from 'vue2-editor'
import md5 from 'md5'
import moment from 'moment'

export default {
    name: 'article',
    components: {
    	Button,
        VueEditor,
        Table,
        TableColumn,
        Dialog,
        Form,
        FormItem,
        Input,
        Cascader,
        MyPagination,
        MessageBox
    },
    data () {
		return {
            dataList: [{
                title: '',
                classify: '',
                content: '',
                createTime: '',
                updateTime: '',
                auth: ''
            }],
            dialogFormVisible: false,
            modalType: 0,                 // 弹框类型，0新增，1编辑
            formOption: {},
            FormRules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                classify: [{ required: true, message: '请输入正确的邮箱地址', trigger: ['blur'] }],
                content: [{ required: true, message: '请输入正确的邮箱地址', trigger: ['blur'] }],
            },
            options2: [],
            props: {
                value: 'label',
                children: 'cities'
            },
            data:{
                pageNum: 1,
                pageSize:10,
                total: null,
            },
            userId:null


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

    watch:{
        formOption(val){
            console.log('val:',val)
        }
    },

    methods: {
        findChind() {

        },
        edit(data){
            console.log(data);

            this.modalType = data ? 1 : 0
            this.dialogFormVisible = true

            if (data) {
                this.formOption = {...data,classifyId:[]}
            }else{
                this.formOption = {content:""}
            }



        },

        del(id,index){
            var that =this
            this.$confirm(`确认删除?`, '提示', '取消确认')
            .then(() =>
                vm.fetch.delete(`/articles/delete/${id}`)
                .then(res=>{
                    // that.getData()
                    if(res && res.resultCode == 200){
                        console.log(99999999999999999);
                        vm.$message({
                            type: 'success',
                            message: '删除成功',
                            duration: 1000
                        })
                        this.getData()
                    }

                })
                .catch(({ msg }) => {
                    vm.$message({
                        type: 'error',
                        message: "删除失败",
                        duration: 1000
                    })
                })
            )
        },

        save(){
            // if(this.modalType){

            // }
                        console.log("分类",this.formOption.classifyId);
                        vm.fetch.get(`/classify/list`)
                        .then(res=>{
                            console.log(res.list);
                            res.list.forEach(it=>{
                                if (it.name == this.formOption.classifyId[this.formOption.classifyId.length-1]) {
                                    // console.log();

                                    if (this.modalType == 1) {
                                        // this.formOption = data
                                        vm.fetch.put(`/articles/update`,{content:this.formOption.content,
                                        title:this.formOption.title,
                                        id: this.formOption.id,
                                        classifyId:it.id,userId:this.userId})
                                        .then(res=>{
                                            if(res && res.resultCode === 200){
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
                                    }else{
                                        console.log(33333333);

                                        vm.fetch.post(`/articles/add`,{...this.formOption,classifyId:it.id,userId:this.userId})
                                        .then(res=>{
                                            if(res && res.resultCode === 200){
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
                                }
                            })

                        })
                        // this.formOption.classifyId = 3

        },

        handleItemChange(val) {
            // console.log('active item:', val);
            // if (val.length>=1) {
            //     vm.fetch.get(`/classify/list`).then(result=>{
            //         console.log(33333,result);
            //         result.list.forEach(item=>{
            //             if (item.name == val[1]) {
            //                 this.formOption.classifyId = item.id
            //             }
            //         })
            //     })
            // }
            // vm.fetch.get(`/classify/list`).then(result=>{
            //     console.log(33333,result);
            //     result.list.forEach(item=>{
            //         if (item.name == val[1]) {
            //             this.formOption.classifyId = item.id
            //         }
            //     })
            // })


        },
        changdeclassify(e) {
            console.log(e);
        },
        handleImageAdded: function(file, Editor, cursorLocation) {
            vm.fetch.get(`/articles/system/qiniu`).then((token) => {
                var formData = new FormData();
                formData.append('key', moment().format('YYYYMMDDHHmmssSSS') + md5(file.name) + file.name.substring(file.name.lastIndexOf('.'), file.name.length))
                formData.append('token', token.uptoken);
                formData.append('file', file);

                const UPLOAD_URL = location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://up-z0.qiniu.com'
                vm.fetch.post(UPLOAD_URL, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(result=>{
                    if(result){
                        let url = token.path + result.key
                        Editor.insertEmbed(cursorLocation, 'image', url);
                    }
                })
           })
        },
        getData(pagedata){
            console.log("获取");
            console.log();

            vm.fetch.post(`/articles/list`,{
                page: pagedata?pagedata.page:this.data.pageNum,
                pageSize:　pagedata?pagedata.pageSize:10,
                type:null
            }).then(data=>{
                this.dataList = data.list
                this.data.pageNum = data.pageNum
                this.data.total = data.total
                console.log('this.data:',this.data)
            })
        }
	}
}
</script>
<style lang='less' >
.article {
    .table_content tr td:nth-child(3) .cell{
        overflow: hidden;

        text-overflow: ellipsis;

        white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
        span {
            p:nth-child(n+2){
                display: none;
            }
            p:nth-child(1) {
                &>*:nth-child(n+2){
                    display: none;
                }
            }

        }
        // background-color: blue;
    }
}

</style>
