<template>
  <div class="avatar_box" :style="{width:width+'px',height:height+'px'}" id="update">
    <Upload
      class="avatar-uploader"
      action="/"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="upload"
      :list-type="type"
      drag
      :disabled='disabled'
      accept="image/jpeg,image/png,image/jpg,image"
    >
      <img v-if="url" :src="url" class="avatar" :style="{width:width+'px',height:height+'px'}">
      <img v-else="url" :src="defaultPic" class="avatar" :style="{width:width+'px',height:height+'px'}">
      <i class="iconfont icon-shangchuanzhaopian" v-if="showIcon"></i>
      <div v-if="showLoading" class="overspread">
        <img src="../assets/img/loading.gif" alt="">
        <p>图片上传中...</p>
      </div>
    </Upload>
  </div>
</template>
<script>
import { Upload } from 'element-ui';

import md5 from 'md5'
import moment from 'moment'

export default {
  data(){
    return {
      url:'',
      head:'',
      showLoading: false,
      loadFalg: true,
    }
  },
  props:{
    showIcon: {
      type: Boolean,
      default:true,
    },
    width: {
      type: String,
      default: '120',
    },
    height: {
      type: String,
      default: '120',
    },
    defaultPic:{
      type: String,
      default: '',
    },
    type:{
      type: String,
      default: 'picture',
    },
    disabled :{
      default: '',
    },
    method:{
      type: String,
      default: '',
    }
  },
  components:{Upload},
  methods:{
    upload({file},onUploadProgress = () => {}){
      vm.fetch.get(`/articles/system/qiniu`).then((token) => {
        var formData = new FormData();
        formData.append('key', moment().format('YYYYMMDDHHmmssSSS') + md5(file.name) + file.name.substring(file.name.lastIndexOf('.'), file.name.length))
        formData.append('token', token.uptoken);
        formData.append('file', file);

        const UPLOAD_URL = location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://up-z0.qiniu.com'
        vm.fetch.post(UPLOAD_URL, formData, {headers: {'Content-Type': 'multipart/form-data'}, onUploadProgress}).then(data=>{
          if(data){
            console.log('data2222:',data)
            this.url = token.path+"/"+data.key
            console.log(2);
            
            this.loadFalg ?  this.$emit(this.method,this.url ) : this.url = ""
            this.showLoading = false
          }
        })
      })
    },

    beforeUpload(file) {
      const isJPEG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isJPG = file.type === 'image/jpg';
      const isLt2M = file.size /1024 / 1024 < 2;
      if (!isJPEG && !isPNG && !isJPG) {
        this.$message({
          message: '上传图片必须是JPG/PNG/JPEG格式!',
          type: 'error'
        });
        return
      }
       if (!isLt2M) {
         console.log(1);
        this.$message.error('上传图片大小不能超过 2MB!');
        this.loadFalg = false
        
        // return
      }else{
        this.loadFalg = true
      }
      this.showLoading = true
    },

    clearImg() {
      this.url = ""
    }

  }
}
</script>

<style lang='less' scoped>
.avatar_box {
    line-height: normal;
    margin-bottom: 5px;
    position: relative;
    .avatar {
        img{
            width: 100%;
        }
    }
    .avatar-uploader {
        display: inline-block;
        border: 1px dashed #d9d9d9;
        height: 100%;
        width: 100%;
        &:hover {
            border-color: #20a0ff;
        }
    }
}
</style>
<style lang="less">
#update{
  .el-upload--picture,.el-upload-dragger{
    height: 100%;
    width: 100%;
  }
  input{
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    hover: pointer;
  }
  .iconfont{
    position: absolute;
    bottom: 2px;
    right: 5px;
    index: 100000;
    color: #4db8fc;
    font-weight: 800;
    font-size: 22px;
  }
  .overspread{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    index: 1000001;
    background: rgba(0,0,0,0.4);
    color: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    img{
      width: 30px;
      height: 30px;
      display: block;
      margin: 0 auto;
    }
  }

}
</style>
