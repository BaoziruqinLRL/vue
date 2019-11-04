<template>
  <div class="main_div">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="300"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
    <div class="div_middle">
      <div v-for="(item) in data">
        <div class="home_circle">
          <span @click="toMemberHome(item.id)">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getMembers} from "../../api/getData";

  export default {
    components: {
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
    /*background: url("../../assets/home/circle.jpeg") no-repeat center;*/
  }
  .div_middle {
    position: absolute;
    top: 30%;
    left: 20%;
    bottom: 30%;
    right: 20%;
    width: 90%;
    height: 90%;
    border: none;
    display: block;
    margin: 0 auto;
  }
  .lizi{
    height: 100%;
  }
  .main_div{
    height: 100%;
    /*background: url("../../assets/home/black.jpeg") no-repeat center;*/
  }
</style>
