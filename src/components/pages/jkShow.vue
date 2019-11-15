<template>
  <div>
    <head-top></head-top>
    <div class="search">
      <div class="search_input search_input_box">
        <span class="search_input_font">名称</span>
        <el-input v-model="searchName" style="width: 25%" placeholder=""></el-input>
        <span class="search_input_font">&nbsp;&nbsp;&nbsp;风格</span>
        <el-input v-model="searchStyle" style="width: 25%" placeholder=""></el-input>
        <span class="search_input_font">&nbsp;&nbsp;&nbsp;颜色</span>
        <el-select v-model="searchColor" style="width: 20%" placeholder="选择颜色">
          <el-option v-for="color in colorList"
                     :key="color"
                     :label="color"
                     :value="color">
          </el-option>
        </el-select>
      </div>
      <div class="search_button">
        <el-button type="primary" icon="el-icon-search" circle @click=""></el-button>
        <el-button type="info" icon="el-icon-refresh-right" circle @click=""></el-button>
        <el-button type="success" icon="el-icon-plus" circle @click="addJk"></el-button>
        <el-dialog
          title="jk-create"
          :visible.sync="createJk"
          width="50%"
          :before-close="createClose">
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
                              type="datetime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="购买时间">
              <el-date-picker class="jk_input"
                              v-model="showJk.buyTime"
                              type="datetime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预览小图">
              <el-upload
                :action="uploadPath"
                :on-success="previewSuccess"
                :file-list="currentPreviewList"
                :auto-upload="true"
                :multiple="false"
                :show-file-list="true"
                :limit="1">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="预览大图">
              <el-input class="jk_input" v-model="showJk.fullImg"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd">取消</el-button>
            <el-button @click="saveJk">保存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="jk_list">
      <el-divider></el-divider>
      <div class="block" v-for="jk in jkList" :key="jk.id">
        <div>
        <div class="block_span">
          <span>{{ jk.name }}</span>
        </div>
        <div>
          <el-button class="block_img" @click="showJkDialog(jk)">
            <el-image
              :src="getImgUrl(jk.previewImg)"
              :fit="fill"></el-image>
          </el-button>
        </div>
        <el-dialog
          title="jk"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <jk-dialog :jk="showJk"></jk-dialog>
        </el-dialog>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from './headTop';
  import jkDialog from '../util/jkDialog';
  import {getJkList,saveJk} from '../../api/getData';

  export default {
    data() {
      return {
        jkList:[
          {
            id: '',
            name: '',
            style: '',
            color: '',
            price: '',
            type: '',
            previewImg: [],
            fullImg: [],
            objModel: '',
            mtlModel: '',
            saleTime: '',
            buyTime: '',
            addTime: ''
          }
        ],
        colorList:['红色','绿色','蓝色'],
        searchName: '',
        searchStyle: '',
        searchColor: '',
        dialogVisible: false,
        createJk: false,
        editJk: false,
        currentPreviewList: [],
        currentFullList: [],
        showJk: {
          id: '',
          name: '',
          style: '',
          color: '',
          price: '',
          type: '',
          previewImg: [],
          fullImg: [],
          objModel: '',
          mtlModel: '',
          saleTime: '',
          buyTime: '',
          addTime: ''
        },
        uploadPath: this.global.imageUploadPath
      }
    },
    components: {
      headTop,
      jkDialog
    },
    mounted() {
      this.getJkInfoList();
    },
    methods:{
      showJkDialog(jk){
        this.showJk = jk;
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
      },
      async getJkInfoList(){
        const res = await getJkList({name: this.searchName, color: this.searchColor, style: this.searchStyle});
        if (res.code === 200) {
          this.jkList = [];
          this.jkList = res.data;
        }
      },
      getImgUrl(url){
        return this.global.imageGetPath + url;
      },
      addJk(){
        this.createJk = true;
        this.clearShowJk();
      },
      async saveJk(){
        this.$message({
          message: this.showJk
        })
        this.showJk.color = this.showJk.color.toString();
        const res = await saveJk(this.showJk);
        if (res.code === 200){
          this.createJk = false;
          this.clearShowJk();
          this.getJkInfoList();
        }else{
          this.$message({
            message: res.message
          })
        }
      },
      cancelAdd(){
        this.createJk = false;
        this.clearShowJk();
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
        this.showJk.previewImg = this.global.jkUploadPath + file.name;
      },
      clearShowJk(){
        this.showJk = {
          id: null,
          name: null,
          style: null,
          color: null,
          price: null,
          type: null,
          previewImg: null,
          fullImg: [],
          objModel: null,
          mtlModel: null,
          saleTime: null,
          buyTime: null,
          addTime: null
        };
      }
    }
  }
</script>

<style scoped>
  @import '../../style/greenYellowSearchStype.css';

  .jk_list{
    position: absolute;
    left: 18.6667%;
    right: 11.3333%;
    top: 25%;
    width: 80%;
    height: 100%;
  }
  .block{
    text-align: center;
    width: 33.33%;
    height: 33.33%;
    float: left;
  }
  .block_span{
    vertical-align: center;
    width: 100%;
    height: 15%;
    float: top;
  }
  .block_img{
    width: 70%;
    height: 70%;
  }
  .jk_input{
    width: 70%;
  }
</style>
