<template>
  <div class="home_circle">
    <el-form :model="logisticsList" ref="logisticsList">
      <el-button @click="submitForm('logisticsList')">登录</el-button>
    </el-form>
    <el-table :data="orders">
      <el-table-column prop="id"></el-table-column>
    </el-table>
  </div>
</template>

<script>

  import {logisticsList} from "@/api/getData"
  export default {
    data() {
      return {
        logisticsList: []
      };
    },
    methods: {
      async submitForm(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid){
            const res = await logisticsList({});
            if (res.logisticsList.length === 0){
              console.log("AAA");
            }
          }
        })
      }
    }
  };

</script>

<style>
  .home_circle {
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 5%;
    margin-left: 35%;
    margin-right: 35%;
  }
</style>
