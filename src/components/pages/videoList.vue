<template>
  <div>
    <head-top></head-top>
    <div class="video_search">
      <div class="video_input search_input_box">
        <span class="search_input_font">名称</span>
        <el-input v-model="searchVideoName" style="width: 25%" placeholder="名称搜索"></el-input>
        <span class="search_input_font">&nbsp;不包含名称搜索</span>
        <el-input v-model="searchVideoFilter" style="width: 25%" placeholder="不包含名称搜索"></el-input>
      </div>
      <div class="video_button">
        <el-button type="primary" icon="el-icon-search" circle @click="getVideoList"></el-button>
        <el-button type="info" icon="el-icon-refresh-right" circle @click="resetSearch"></el-button>
        <el-button type="success" icon="el-icon-plus" circle @click="addGroup"></el-button>
      </div>
      <div class="video_table">
        <el-table :data="videoList" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expands">
          <!-- 总展示 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.series" style="width: 100%" :row-class-name="getSeriesRowColor">
                <!-- 系列展示 -->
                <el-table-column type="expand">
                  <template slot-scope="scopes">
                    <el-table :data="scopes.row.episodes" style="width: 100%" :row-class-name="getEpisodeRowColor">
                      <!-- 单集展示 -->
                      <el-table-column type="expand">
                        <template slot-scope="scope">
                          <el-form label-position="left" inline class="table-expand">
                            <el-form-item label="视频本地路径">
                              <template>
                                <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.localUrl"></el-input>
                                <span v-else>{{scope.row.localUrl}}</span>
                              </template>
                            </el-form-item>
                            <el-form-item label="视频大小">
                              <template>
                                <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.memory"></el-input>
                                <span v-else>{{scope.row.memory}}M</span>
                              </template>
                            </el-form-item>
                          </el-form>
                        </template>
                      </el-table-column>
                      <el-table-column label="片名" class="table_column_son">
                        <template slot-scope="scope">
                          <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.name"></el-input>
                          <span v-else>{{scope.row.name}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="集数" class="table_column_son">
                        <template slot-scope="scope">
                          <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.episode"></el-input>
                          <span v-else>{{scope.row.episode}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="下一集" class="table_column_son">
                        <template slot-scope="scope">
                          <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.nextEpisode"></el-input>
                          <span v-else>{{scope.row.nextEpisode}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" class="table_column">
                        <template slot-scope="scope">
                          <el-button v-if="scope.row.edit" size="mini" @click="saveEpisode(scope.row)" class="el-icon-check" circle></el-button>
                          <el-button v-else size="mini" @click="setEdit(scope.row)" class="el-icon-edit" circle></el-button>
                          <el-button v-if="scope.row.edit" size="mini" type="danger" @click="cancelEdit(scope.row)" class="el-icon-circle-close" circle></el-button>
                          <el-button v-else size="mini" type="danger" @click="deleteEpisode(scope.row)" class="el-icon-delete" circle></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="片季" class="table_column">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.name"></el-input>
                    <span v-else>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="总集数" class="table_column">
                  <template slot-scope="scope">
                    <span>{{scope.row.totalEpisode}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" class="table_column">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" size="mini" @click="saveSeries(scope.row)" class="el-icon-check" circle></el-button>
                    <el-button v-else size="mini" @click="setEdit(scope.row)" class="el-icon-edit" circle></el-button>
                    <el-button v-if="scope.row.edit" size="mini" type="danger" @click="cancelEdit(scope.row)" class="el-icon-circle-close" circle></el-button>
                    <el-button v-else size="mini" type="danger" @click="deleteSeries(scope.row)" class="el-icon-delete" circle></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="系列名" class="table_column">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.name"></el-input>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="系列类型" class="table_column">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.type"></el-input>
              <span v-else>{{scope.row.type}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="总季数" class="table_column">
            <template slot-scope="scope">
              <span>{{scope.row.totalSeries}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="总集数" class="table_column">
            <template slot-scope="scope">
              <span>{{scope.row.totalEpisode}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" class="table_column">
            <template slot-scope="scope">
              <el-button v-if="scope.row.edit" size="mini" @click="saveGroup(scope.row)" class="el-icon-check"></el-button>
              <el-button v-else size="mini" @click="setEdit(scope.row)" class="el-icon-edit"></el-button>
              <el-button v-if="scope.row.edit" size="mini" type="danger" @click="cancelEdit(scope.row)" class="el-icon-circle-close"></el-button>
              <el-button v-else size="mini" type="danger" @click="deleteGroup(scope.row)" class="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from './headTop';

  export default {
    components: {
      headTop
    },
    data() {
      return {
        videoList: [
          {
            id: 1,
            name: 'group-1',
            type: '1',
            totalSeries: 2,
            totalEpisode: 20,
            edit: false,
            series: [
              {
                id: 1,
                series: 1,
                name: '第一季',
                type: '1',
                totalEpisode: 10,
                edit: false,
                episodes: [
                  {
                    id: 1,
                    index: 'test',
                    localUrl: 'local',
                    name: 'name',
                    type: '1',
                    episode: 1,
                    nextEpisode: 2,
                    nextEpisodeId: 15,
                    group: 1,
                    series: 1,
                    addTime: '',
                    memory: '1024',
                    edit: false
                  }
                ]
              },
              {
                id: 2,
                series: 2,
                name: '第二季',
                type: '1',
                totalEpisode: 10,
                edit: false,
                episodes: [
                  {
                    id: 2,
                    index: 'test',
                    localUrl: 'local',
                    name: 'name',
                    type: '1',
                    episode: 1,
                    nextEpisode: 2,
                    nextEpisodeId: 16,
                    group: 1,
                    series: 2,
                    addTime: '',
                    memory: '1024',
                    edit: false
                  }
                ]
              }
            ]
          }
        ],
        searchVideoFilter: null,
        searchVideoName: null,
        getRowKeys (row) {
          return row.id
        },
        // 要展开的行，数值的元素是row的key值
        expands: []
      }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      async getEmailJobList(){
        const res = await getVideoList({name: this.searchVideoName, filter: this.searchVideoFilter});
        if (res.code === 200) {
          res.data.forEach(e => {
            e.edit = false;
            e.rules.forEach(r => {
              r.edit = false;
            })
          });
          this.tableData = res.data;
        }
        this.cleanExpands();
      },
      async resetSearch(){
        this.searchVideoFilter = null;
        this.searchVideoName = null;
      },
      async addGroup(){
        this.videoList.push({
          id: null,
          name: null,
          type: null,
          totalSeries: null,
          totalEpisode: null,
          series: null,
          edit: true
        })
      },
      async addSeries(group){
        group.series.push({
          id: null,
          series: null,
          name: null,
          type: null,
          totalEpisode: null,
          episodes: null,
          edit: true
        })
      },
      async addEpisode(series){
        series.episodes.push({
          id: null,
          index: null,
          localUrl: null,
          name: null,
          type: null,
          episode: null,
          nextEpisode: null,
          nextEpisodeId: null,
          group: null,
          series: null,
          addTime: null,
          memory: null,
          edit: true
        })
      },
      async setEdit(data){
        data.edit = true;
      },
      async cancelEdit(data){
        data.edit = false;
      },
      async getSeriesRowColor(){
        return 'table-series';
      },
      async getEpisodeRowColor(){
        return 'table-episode';
      }
    }
  }
</script>

<style scoped>
  .video_search{
    position: absolute;
    top: 15%;
    left: 20%;
    right: 5%;
    height: 10%;
  }
  .video_input{
    position: absolute;
    top: 10%;
    width: 100%;
    /*left: 3%;*/
  }
  .video_button{
    position: absolute;
    top: 10%;
    /*left: 40%;*/
    right: 5%;
  }
  .video_table{
    position: absolute;
    top: 80%;
    width: 100%;
    /*left: 20%;*/
    /*right: 5%;*/
  }
  .video_table >>> .el-table__expanded-cell{
    padding: 10px 20px;
  }
  .search_input_font{
    text-transform: uppercase;
    color: black;
    font-family: 'Economica', sans-serif;
    text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
    font-size: 14px;
    margin: 0;
    -webkit-transition: font-size 0.3s;
    transition: font-size 0.3s;
    vertical-align: middle;
  }
  .search_input_box{
   }
  .search_input_box input{
    border: 2px solid #7BA7AB;
    border-radius: 5px;
    background: #F9F0DA;
    color: #9E9C9C;
    height: 35px;
  }
  .table_column_son{
    width: 100%;
  }
  .table_column{
    width: 100%;
  }
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 130px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .el-table .table-series {
    background: oldlace;
  }

  .el-table .table-episode {
    background: #f0f9eb;
  }
</style>
