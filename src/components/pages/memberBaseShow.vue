<template>
  <div>
    <head-top></head-top>
    <div class="maze-title">
      先来玩个迷宫叭
    </div>
    <div class="maze-self">
      <maze></maze>
    </div>
  </div>
</template>

<script>
  import headTop from '../../components/pages/headTop';
  import Maze from 'vue-maze';

  export default {
    data(){
      return {
      }
    },
    components: {
      headTop,
      Maze
    },
    mounted(){
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style scoped>
  .maze-title{
    position: fixed;
    top: 11%;
    left: 54.3333%;
    text-align: center;
  }
  .maze-self {
    position: fixed;
    top: 15%;
    left: 21.6667%;
    bottom: 5%;
    right: 5%;
    border: none;
  }
  .maze-self >>> .maze{
    min-height: 100%;
  }
</style>
