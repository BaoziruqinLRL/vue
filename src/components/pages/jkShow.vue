<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
        <el-button type="primary" icon="el-icon-search" circle @click="getEmailJobList"></el-button>
        <el-button type="info" icon="el-icon-refresh-right" circle @click="resetSearch"></el-button>
        <el-button type="success" icon="el-icon-plus" circle @click="addJob"></el-button>
      </div>
    </div>
    <div class="jk_list">
      <el-divider></el-divider>
      <div class="block" v-for="jk in jkList" :key="jk.id">
        <div class="block_span">
          <span>{{ jk.name }}</span>
        </div>
        <el-button class="block_img" @click="showJkDialog(jk)">
          <el-image
            :src="jk.previewImg"
            :fit="fill"></el-image>
        </el-button>
        <el-dialog
          title="jk"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <jk-dialog :jk="showJk"></jk-dialog>
        </el-dialog>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from './headTop';
  import jkDialog from '../util/jkDialog';

  export default {
    data() {
      return {
        jkList:[
          {
            id: 1,
            name: '森林绿',
            style: '绿色格子',
            color: '绿色',
            price: 120,
            type: 1,
            previewImg: 'file:///Users/admin/Downloads/jk/a-preview.jpeg',
            objModel: '',
            mtlModel: '',
            saleTime: '2019-11-01 15:00:00',
            buyTime: '2019-11-05 18:28:30',
            addTime: '2019-11-13 15:00:00'
          },
          {
            id: 2,
            name: '森林蓝',
            style: '蓝色格子',
            color: '蓝色',
            price: 120,
            type: 1,
            previewImg: '',
            objModel: '',
            mtlModel: '',
            saleTime: '2019-11-01 15:00:00',
            buyTime: '2019-11-05 18:28:30',
            addTime: '2019-11-13 15:00:00'
          },
          {
            id: 3,
            name: '草莓大福',
            style: '红色草莓格子',
            color: '红色',
            price: 120,
            type: 1,
            previewImg: '',
            objModel: '',
            mtlModel: '',
            saleTime: '2019-11-01 15:00:00',
            buyTime: '2019-11-05 18:28:30',
            addTime: '2019-11-13 15:00:00'
          },
          {
            id: 4,
            name: '海豚',
            style: '蓝色格子',
            color: '蓝色',
            price: 120,
            type: 1,
            previewImg: '',
            objModel: '',
            mtlModel: '',
            saleTime: '2019-11-01 15:00:00',
            buyTime: '2019-11-05 18:28:30',
            addTime: '2019-11-13 15:00:00'
          },
          {
            id: 5,
            name: '森林蓝',
            style: '蓝色格子',
            color: '蓝色',
            price: 120,
            type: 1,
            previewImg: '',
            objModel: '',
            mtlModel: '',
            saleTime: '2019-11-01 15:00:00',
            buyTime: '2019-11-05 18:28:30',
            addTime: '2019-11-13 15:00:00'
          },
          {
            id: 6,
            name: '森林蓝',
            style: '蓝色格子',
            color: '蓝色',
            price: 120,
            type: 1,
            previewImg: '',
            objModel: '',
            mtlModel: '',
            saleTime: '2019-11-01 15:00:00',
            buyTime: '2019-11-05 18:28:30',
            addTime: '2019-11-13 15:00:00'
          }
        ],
        colorList:['红色','绿色','蓝色'],
        searchName: '',
        searchStyle: '',
        searchColor: '',
        dialogVisible: false,
        showJk: {
          id: null,
          name: null,
          style: null,
          color: null,
          price: null,
          type: null,
          previewImg: null,
          objModel: null,
          mtlModel: null,
          saleTime: null,
          buyTime: null,
          addTime: null
        }
      }
    },
    components: {
      headTop,
      jkDialog
    },
    methods:{
      showJkDialog(jk){
        this.showJk = jk;
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
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

</style>
