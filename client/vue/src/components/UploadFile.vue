<template>
  <div class="avatar_box" :style="{width:width+'px',height:height+'px'}" id="update">
    <Upload
      class="avatar-uploader"
      action="/"
      :show-file-list="false"
      :http-request="upload"
      :list-type="type"
      drag
      :disabled='disabled'
      :before-upload="beforeAvatarUpload"
      
    >
      <video v-if="url" :src="url" class="avatar" :style="{width:width+'px',height:height+'px'}" id='video'></video>
      <video v-else="url" :src="defaultPic"  class="avatar" :style="{width:width+'px',height:height+'px'}" ref='yy'></video>
      <div class="overspread" v-if="percentage && percentage !=100">
        <Progress type="circle" :percentage="percentage" color="#409EFF"></Progress>
      </div>
      <div class="load-text"v-if="!percentage" >
        <h3>点击上传视频<br/>(不能超过800MB)</h3>
      </div>
      <div v-if="showLoading" class="overspread">
        <img src="/static/loading.gif" alt="">
        <p>视频渲染中...</p>
      </div>
    </Upload>
    <p style="color:#666">只能上传MP4/mov格式文件</p>
  </div>
</template>
<script>
import { Upload , Progress } from 'element-ui';

import md5 from 'md5'
import moment from 'moment'

export default {
  data(){
    return {
      url:'',
      head:'',
      percentage: 0,
      showLoading:false
    }
  },
  props:{
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
    },
    size:{
      type: String,
      default: '',
    }
  },
  components:{Upload,Progress},
  watch:{
    url(newValue, oldValue){
      if(newValue){
        let vide = document.querySelector("video")
        if(vide.src){
          setTimeout(this.showLoading=false,4000)
        }
      }
    }
  },
  methods:{
    beforeAvatarUpload() {
      this.percentage = 1
    },
    upload({file},onUploadProgress = this.progress){
      if(file.type.split('/')[1] != 'mp4' && file.type.split('/')[1] != 'mov' && file.type.split('/')[1] != 'quicktime'){
        vm.$message({
          type: 'warning',
          message: '请上传正确的视频格式'
        })
        return
      }
      if(file.size >= 1024*1024*800) {
        vm.$message({
          type: 'warning',
          message: '视频大小不能超过800MB'
        })
        return
      }

      vm.fetch.get(`/articles/system/qiniu`).then((token) => {
        var formData = new FormData();
        formData.append('key', moment().format('YYYYMMDDHHmmssSSS') + md5(file.name) + file.name.substring(file.name.lastIndexOf('.'), file.name.length))
        formData.append('token', token.uptoken);
        formData.append('file', file);

        const UPLOAD_URL = location.protocol === 'https:' ? 'https://up.qbox.me' : 'http://up-z0.qiniu.com'
        vm.fetch.post(UPLOAD_URL, formData, {headers: {'Content-Type': 'multipart/form-data'}, onUploadProgress}).then(data=>{
          if(data){
            this.url = token.path+"/"+data.key
            this.$emit(this.method,this.url)
          }
        })
      })
    },

    progress(event, file, fileList){
      this.percentage = (event.loaded) / (event.total)*100
      this.percentage = Number(this.percentage.toFixed(2))
      if(this.percentage==100){
        this.showLoading=true
      }
    },
    clearUrl() {
      this.url = null
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
    .load-text{
      color: #666;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
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
  .el-progress-circle{
    margin: 0 auto;
  }
  .el-progress__text{
    color: #fff;
  }
}
</style>
