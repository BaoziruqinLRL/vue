<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" class="navigation-style">
        <el-menu class="navigation-style" router>
          <!-- 构建首页按钮 -->
          <el-menu-item class="home_style" index="/member-navigation"><i class="el-icon-menu"></i>
            <span>首页</span>
          </el-menu-item>
          <!-- 循环构建菜单栏 -->
          <template v-for="(menu) in menusList">
            <template v-if="menu.childMenus">
              <el-submenu class="el-submenu-navigation" :index="menu.menu.name">
                <template slot="title">
                  <i class="el-icon-message"></i>
                  <span class="text-color">{{menu.menu.name}}</span>
                </template>
                <template v-for="(child) in menu.childMenus">
                  <el-menu-item class="el-menu-item-width" :index="child.code">
                    <span>{{child.name}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item class="el-menu-item-width" :index="menu.menu.code"><i class="el-icon-document"></i>
                <span>{{menu.menu.name}}</span>
              </el-menu-item>
            </template>
          </template>
          <!-- 构建个人中心按钮 -->
          <el-menu-item class="el-menu-item-width" index="/member-info">
            <i class="el-icon-setting"></i>
            <span>个人中心</span>
          </el-menu-item>
          <!-- 构建切换成员按钮 -->
          <el-menu-item class="el-menu-item-width" index="/home">
            <i class="el-icon-setting"></i>
            <span>切换成员</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getMenus} from "../../api/getData";
  export default {
    data(){
      return {
        menusList: [],
        memberBaseInfo: {}
      }
    },
    computed: {
    },
    mounted() {
      this.menus();
      this.getMemberBaseInfo();
      this.toMemberBase();
    },
    methods: {
      async menus() {
        const userId = localStorage.getItem("userId");
        const res = await getMenus({"userId": userId});
        let index = 1;
        if (res.code === 200) {
          res.data.forEach(item => {
            item.index = index;
            this.menusList.push(item);
            index = index + 1;
          })
        } else {
          this.$message({
            message: res.message
          });
        }
      },
      getMemberBaseInfo(){
        // const memberId = localStorage.getItem("memberId");
      },
      getImgUrl(icon){
        return require("@/assets/navigation/menuIcon"+icon+".jpeg");
      },
      async toMemberBase(){
        this.$router.push('')
      }
    }
  }
</script>


<style scoped>
  .navigation-style{
    /*width: 16.6667%;*/
    min-height: 100%;
    background-color: #324057;
  }

  .navigation-style >>> .el-menu{
    border-right: solid 0 #e6e6e6;
  }
  .home_style{
    color: #ffffff;
    min-height: 100%;
    background-color: #324057;
  }
  .home_style:active{
    background-color: #d1dbe5;
  }
  .home_style:focus{
    color: #20a0ff;
  }

  .el-menu-item-width{
    color: #ffffff;
    min-width: 100%;
    min-height: 100%;
    background-color: #324057;
  }
  .el-menu-item-width:hover{
    background-color: #d1dbe5;
  }
  .el-menu-item-width:focus{
    color: #20a0ff;
  }

  .el-submenu-navigation:hover >>> .el-submenu__title:hover{
    background-color: #d1dbe5;
  }
  .el-submenu-navigation {
    color: #ffffff;
    width: 100%;
    min-height: 100%;
    background-color: #324057;
  }
  .el-submenu-navigation:focus{
    color: #20a0ff;
  }

  .text-color{
    color: #ffffff;
  }
</style>
