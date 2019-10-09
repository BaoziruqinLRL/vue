<template>
  <div>
    <head-top></head-top>
    <div class="item-center">
      <div style="float: left;">
        <img src="../../assets/memberinfo/username.jpg" />
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple button-small">
              <el-input v-model="userName" placeholder="用户名"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="item-center">
      <div style="float: left;">
        <img src="../../assets/memberinfo/username.jpg" />
      </div>
      <div>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple button-small">
              <el-input v-model="userName" placeholder="用户名"></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from './headTop';

  export default {
    data(){
      return {
        userName: '啊啊啊啊咧',
        nickName: ''
      }
    },
    components: {
      headTop
    }
  }
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .button-small{
    position: absolute;
    top: 25%;
  }
  .button-small >>> .el-input__inner {
    background: none;
    border: 0;
  }

  .item-center{
    padding-left: 35%;
    padding-right: 35%;
  }
</style>
