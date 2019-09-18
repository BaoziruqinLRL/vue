<template>
  <div_middle>
    <div v-for="(item) in data" @click="menus">
      <div class="home_circle">
        <span @click="toMemberHome(item.id)">{{item.name}}</span>
      </div>
    </div>
  </div_middle>
</template>

<script>
  import {getMembers} from "../../api/getData";
  import Maze from 'vue-maze';

  export default {
    components: {
      'mazeel': Maze
    },
    data() {
      return {
        data: [],
        memberSize: 1
      };
    },
    mounted(){
      this.init();
      this.submitForm();
    },
    methods: {
      init(){
        // 初始化数据,清除多余参数
        localStorage.removeItem("memberId");
      },
      async submitForm(){
        const res = await getMembers({userId: localStorage.getItem("userId")});
        this.data = [];
        this.memberSize = 1;
        if (res === undefined || res === null){
          this.$message({
            message: "res is null"
          });
        }else{
          res.data.forEach(item => {
            this.data.push(item);
            this.memberSize += 1;
          })
        }
      },
      toMemberHome(memberId){
        localStorage.setItem("memberId",memberId);
        this.$router.push({
          name: 'memberNavigation'
        })
      }
    }
  };

</script>

<style scoped>
  .home_circle{
    text-align: center;
    line-height: 200px;
    width: 200px;
    height: 200px;
    float: left;
    background: url("../../assets/home/circle.jpeg") no-repeat center;
  }
  div_middle {
    position: absolute;
    top: 5%;
    left: 5%;
    bottom: 5%;
    right: 5%;
    width: 90%;
    height: 90%;
    border: none;
  }
</style>
