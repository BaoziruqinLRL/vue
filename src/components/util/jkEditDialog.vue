<template>
  <div class="jk_div">
    <el-dialog
      title="jk-edit"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form :model="showJk" style="padding: 0 20%">
        <el-form-item>
          &#12288;&#12288;名称&ensp;
          <el-input class="jk_input" v-model="showJk.name"></el-input>
        </el-form-item>
        <el-form-item>
          &#12288;&#12288;风格&ensp;
          <el-input class="jk_input" v-model="showJk.style"></el-input>
        </el-form-item>
        <el-form-item>
          &#12288;&#12288;颜色&ensp;
          <el-select class="jk_input"
                     v-model="showJk.color"
                     multiple
                     filterable
                     allow-create
                     default-first-option>
            <el-option v-for="color in colorList"
                       :key="color"
                       :label="color"
                       :value="color">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          &#12288;&#12288;价格&ensp;
          <el-input class="jk_input" v-model="showJk.price"></el-input>
        </el-form-item>
        <el-form-item>
          &#12288;&#12288;类型&ensp;
          <el-select class="jk_input" v-model="showJk.type">
            <el-option label="裙子" value="1"></el-option>
            <el-option label="上衣" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开售时间">
          <el-date-picker class="jk_input"
                          v-model="showJk.saleTime"
                          type="datetime"
                          value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="购买时间">
          <el-date-picker class="jk_input"
                          v-model="showJk.buyTime"
                          type="datetime"
                          value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预览小图">
          <el-upload
            :action="uploadPath"
            :on-success="previewSuccess"
            :file-list="currentPreviewList"
            :auto-upload="true"
            :multiple="false"
            :show-file-list="showFileList"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="预览大图">
          <el-input class="jk_input" v-model="showJk.fullImg"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="handleConfirm">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      showJk: {
        type: Object,
        default: function() {
          return {
            id: 1,
            name: '森林绿',
            style: '绿色格子',
            color: '绿色',
            price: 120,
            type: 1,
            previewImg: '',
            objModel: '',
            mtlModel: '',
            saleTime: '2019-11-01 15:00:00',
            buyTime: '2019-11-05 18:28:30',
            addTime: '2019-11-13 15:00:00'
          }
        }
      },
      dialogVisible: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      colorList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data(){
      return {
        uploadPath: this.global.imageUploadPath,
        currentPreviewList: [
          {
            name: '',
            url: ''
          }
        ],
        currentFullList: [
          {
            name: '',
            url: ''
          }
        ],
        showFileList: false
      }
    },
    mounted(){
    },
    computed: {
    },
    methods: {
      handleClose(){
        this.$emit('dialogClose', {dialogVisible: false, confirm: false});
      },
      handleConfirm(){
        this.showJk.color = this.showJk.color.toString();
        this.showJk.previewImg = this.currentPreviewList[0].url;
        let li = [];
        this.currentFullList.forEach(x => {
          if (x.url !== null || x.url !== ''){
            li.push(x.url);
          }
        });
        this.showJk.fullImg = li;
        this.$emit('dialogClose', {confirm: true, jk: this.showJk});
      },
      previewSuccess(response, file, fileList){
        if (response.code === 200) {
          this.$message({
            message: '上传成功'
          })
        }else{
          this.$message({
            message: response.message
          })
        }
        this.currentPreviewList[0].url = this.global.jkUploadPath + file.name;
        this.currentPreviewList[0].name = file.name;
        this.showFileList = true;
      },
      clearFileList(){
        this.currentPreviewList = [{
          name: null,
          url: null
        }];
        this.currentFullList = [{
          name: null,
          url: null
        }];
      }
    },
    watch: {
      showJk(val){
        if (val.previewImg == null || val.previewImg.lastIndexOf('/') === -1){
          this.currentPreviewList[0].name = null;
          this.currentPreviewList[0].url = null;
          this.showFileList = false;
        }else {
          this.showFileList = true;
          this.currentPreviewList[0].name = val.previewImg.substring(val.previewImg.lastIndexOf('/') + 1);
          this.currentPreviewList[0].url = val.previewImg;
        }
      }
    }
  }
</script>

<style scoped>
  .jk_div{
    text-indent: 0;
    text-align: left;
  }
  .jk_div >>> .el-date-editor{
    width: 70%;
  }
  .jk_input{
    width: 70%;
  }
</style>
