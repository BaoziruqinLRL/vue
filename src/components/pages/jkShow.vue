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
        <el-button type="primary" icon="el-icon-search" circle @click="getJkInfoList"></el-button>
        <el-button type="info" icon="el-icon-refresh-right" circle @click="resetSearch"></el-button>
        <el-button type="success" icon="el-icon-plus" circle @click="addJk"></el-button>
        <jk-edit-dialog
          :showJk="showJk"
          :dialogVisible="createJk"
          :colorList="colorList"
          @dialogClose="createDialogClose">
        </jk-edit-dialog>
      </div>
    </div>
    <div class="jk_list">
      <el-divider></el-divider>
      <div class="block" v-for="jk in jkList" :key="jk.id">
        <div class="block_span">
          <span style="width: 100%; text-align: center">{{ jk.name }}</span>
          <div style="float: right;">
            <el-button circle @click="editJkInfo(jk)" class="el-icon-edit"></el-button>
            <jk-edit-dialog
              :showJk="showJk"
              :dialogVisible="editJk"
              :colorList="colorList"
              @dialogClose="editDialogClose">
            </jk-edit-dialog>
          </div>
        </div>
        <div class="block_img">
          <el-button style="width: 100%; height: 100%;" @click="showJkDialog(jk)">
            <el-image
              style="width: 100%; height: 100%;"
              :src="getImgUrl(jk.previewImg)">
            </el-image>
          </el-button>
        </div>
        <jk-dialog
          :jk="showJk"
          :dialogVisible="dialogVisible"
          @dialogClose="showDialogClose">
        </jk-dialog>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from './headTop';
  import jkDialog from '../util/jkDialog';
  import jkEditDialog from '../util/jkEditDialog';
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
        searchName: null,
        searchStyle: null,
        searchColor: null,
        dialogVisible: false,
        createJk: false,
        editJk: false,
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
        totalWidth: window.innerWidth
      }
    },
    components: {
      headTop,
      jkDialog,
      jkEditDialog
    },
    created(){
      this.getJkInfoList();
      window.addEventListener('resize', this.setTotalWidth);
    },
    mounted() {
    },
    methods:{
      setTotalWidth(){
        this.totalWidth = window.innerWidth;
      },
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
      editJkInfo(jk){
        this.editJk = true;
        this.showJk = jk;
      },
      async saveJk(){
        this.$message({
          message: this.showJk
        })
        const res = await saveJk(this.showJk);
        if (res.code === 200){
          this.$message({
            message: res.message
          });
          this.initShowTag();
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
      },
      controlBlock(){
        let divList = document.getElementsByClassName("block");
        for (let i = 0; i < divList.length; i++){
          let div = divList[i];
          let width = window.getComputedStyle(div).getPropertyValue("width");
          div.setAttribute("style","height: 0;");
          div.style.height = width;
        }
      },
      showDialogClose(payload){
        this.dialogVisible = payload.dialogVisible;
      },
      createDialogClose(payload){
        if (payload.confirm){
          this.showJk = payload.jk;
          this.saveJk();
          this.initShowTag();
        }else{
          this.createJk = payload.dialogVisible;
        }
      },
      editDialogClose(payload){
        if (payload.confirm){
          this.showJk = payload.jk;
          this.saveJk();
          this.initShowTag();
        }else{
          this.editJk = payload.dialogVisible;
        }
      },
      initShowTag(){
        this.dialogVisible = false;
        this.createJk = false;
        this.editJk = false;
      },
      resetSearch(){
        this.searchStyle = null;
        this.searchColor = null;
        this.searchName = null;
      }
    },
    watch:{
      jkList:function(){
        this.$nextTick(function(){
          this.controlBlock();
        });
      },
      totalWidth:function(){
        this.controlBlock();
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
    width: 25%;
    float: left;
  }
  .block_span{
    width: 70%;
    height: 15%;
    line-height: 220%;
    float: top;
    padding: 0 15%;
    text-indent: 1em;
  }
  .block_span >>> .is-circle{
    border: 0;
    padding: 12px 0;
    float: left;
  }
  .block_img{
    width: 70%;
    height: 70%;
    padding: 0 15%;
  }
  .block_img >>> .el-button{
    padding: 20px 20px;
  }
  .jk_input{
    width: 70%;
  }
</style>
