<template>
  <div>
    <head-top></head-top>
    <div class="step_style">
      <el-steps :active="active">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3" description=""></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="nextStep">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import headTop from './headTop';

  export default {
    components: {
      headTop
    },
    data(){
      return {
        active: 0,
        foodList: [
          {
            title: "A",
            remark: "remark",
            material: "meterial",
            steps: [
              {
                step: 0,
                title: "0-title",
                remark: "0-remark",
                material: "0-material"
              },
              {
                step: 1,
                title: "1-title",
                remark: "1-remark",
                material: "1-material"
              },
              {
                step: 2,
                title: "2-title",
                remark: "2-remark",
                material: "2-material"
              }
            ]
          }
        ]
      }
    },
    methods: {
      nextStep() {
        if (this.active++ > 2) {
          this.active = 0;
        }
      }
    }
  }
</script>

<style>
  .step_style{
    position: absolute;
    left: 20%;
    top: 15%;
    width: 75%;
  }
</style>
