<template>
  <div>
    <head-top></head-top>
    <div class="job_search">
      <div class="job_input search_input_box">
        <span class="search_input_font">任务名</span>
        <el-input v-model="searchJobName" style="width: 25%" placeholder="输入任务名"></el-input>
        <span class="search_input_font">&nbsp;&nbsp;&nbsp;发件人</span>
        <el-input v-model="searchJobSender" style="width: 25%" placeholder="输入发件人"></el-input>
        <span class="search_input_font">&nbsp;&nbsp;&nbsp;邮件类型</span>
        <el-select v-model="searchJobType" style="width: 20%" placeholder="选择类型">
          <el-option v-for="item in emailType"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="job_button">
        <el-button type="primary" icon="el-icon-search" circle @click="getEmailJobList"></el-button>
        <el-button type="info" icon="el-icon-refresh-right" circle @click="resetSearch"></el-button>
        <el-button type="success" icon="el-icon-plus" circle @click="addJob"></el-button>
      </div>
    </div>
    <div class="job_table">
      <el-table :data="tableData" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expands">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="主题">
                <template>
                  <el-input v-if="props.row.edit" placeholder="请输入内容" v-model="props.row.subject"></el-input>
                  <span v-else>{{props.row.subject}}</span>
                </template>
              </el-form-item>
              <el-form-item label="文本">
                <template>
                  <el-input v-if="props.row.edit" placeholder="请输入内容" v-model="props.row.context"></el-input>
                  <span v-else>{{props.row.context}}</span>
                </template>
              </el-form-item>
              <el-table :data="props.row.rules" style="width: 100%">
                <el-table-column label="规则序号" style="width: 4%" >
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.ruleSort"></el-input>
                    <span v-else>{{scope.row.ruleSort}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="开始日期" class="table_column_son">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.startDate"></el-input>
                    <span v-else>{{scope.row.startDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="结束日期" class="table_column_son">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.endDate"></el-input>
                    <span v-else>{{scope.row.endDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="开始时间" class="table_column_son">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.startTime"></el-input>
                    <span v-else>{{scope.row.startTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="结束时间" class="table_column_son">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.endTime"></el-input>
                    <span v-else>{{scope.row.endTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="间隔" class="table_column_son">
                  <template slot-scope="scope">
                    <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.interval"></el-input>
                    <span v-else>{{scope.row.interval}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" class="table_column_son">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" size="mini" @click="saveJobRule(scope.row)" class="el-icon-check"></el-button>
                    <el-button v-else size="mini" @click="setEdit(scope.row)" class="el-icon-edit"></el-button>
                    <el-button size="mini" type="danger" @click="saveEdit(scope.row)" class="el-icon-delete" circle></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="任务名" class="table_column">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.name"></el-input>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发件人" class="table_column">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.sender"></el-input>
            <span v-else>{{scope.row.sender}}</span>
          </template>
        </el-table-column>
        <el-table-column label="授权码" class="table_column">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" placeholder="请输入内容" v-model="scope.row.authCode"></el-input>
            <span v-else>{{scope.row.authCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typeName" label="邮件类型" class="table_column">
          <template slot-scope="scope">
            <el-select v-if="scope.row.edit" v-model="scope.row.typeName" style="width: 100%" placeholder="选择类型">
              <el-option v-for="item in emailType"
                         :key="item.id"
                         :label="item.name"
                         :value="item.name">
              </el-option>
            </el-select>
            <span v-else>{{scope.row.typeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class="table_column">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" size="mini" @click="saveJob(scope.row)" class="el-icon-check"></el-button>
            <el-button v-else size="mini" @click="setEdit(scope.row)" class="el-icon-edit"></el-button>
            <el-button size="mini" type="danger" @click="" class="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from './headTop';
  import {getEmailJobList} from "../../api/getData";
  import {saveJob} from "../../api/getData";
  import {saveJobRule} from "../../api/getData";

  export default {
    data(){
      return {
        tableData: [
          {
            id: null,
            name: null,
            sender: null,
            authCode: null,
            typeName: null,
            type: null,
            subject: null,
            context: null,
            edit: false,
            rules: [
              {
                ruleSort: null,
                startDate: null,
                endDate: null,
                startTime: null,
                endTime: null,
                interval: null,
                edit: false
              }
            ]
          }
        ],
        emailType: [
          {
            id: 1,
            name: "主题邮件"
          },
          {
            id: 2,
            name: "模板邮件"
          }
        ],
        searchJobName: null,
        searchJobSender: null,
        searchJobType: null,
        getRowKeys (row) {
          return row.id
        },
        // 要展开的行，数值的元素是row的key值
        expands: []
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.getEmailJobList();
    },
    methods: {
      async getEmailJobList(){
        const res = await getEmailJobList({name: this.searchJobName, sender: this.searchJobSender, type: this.searchJobType});
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
        this.searchJobName = null;
        this.searchJobSender = null;
        this.searchJobType = null;
      },
      async setEdit(data){
        data.edit = true;
        this.expands.push(data.id);
      },
      async saveJob(email){
        let pass = false;
        // 发起创建请求
        if (email.name === null){
          this.$message({
            message: "请输入邮件名"
          });
        } else if (email.sender === null){
          this.$message({
            message: "请输入收件人"
          });
        }else if (email.authCode === null){
          this.$message({
            message: "请输入授权码"
          });
        }else if (email.typeName === null){
          this.$message({
            message: "请选择邮件类型"
          });
        } else if (email.subject === null) {
          this.$message({
            message: "请填写邮件主题"
          });
        }else if (email.context === null) {
          this.$message({
            message: "请填写邮件文本"
          });
        } else if (email.rules !== null){
          let rulePass = true;
          email.rules.forEach(rule => {
            if (rule.startDate === null){
              this.$message({
                message: "规则开始日期不能为空"
              });
              rulePass = false;
            } else if (rule.startTime === null){
              this.$message({
                message: "规则开始时间不能为空"
              });
              rulePass = false;
            } else if (rule.interval === null){
              this.$message({
                message: "规则间隔不能为空"
              });
              rulePass = false;
            }
          });
          pass = rulePass;
        } else {
          pass = true;
        }
        if (pass){
          // 判断通过
          this.emailType.forEach(e => {
            if (email.typeName === e.name){
              email.type = e.id;
            }
          });
          // 发起创建请求, 创建邮件任务
          const res = await saveJob(email);
          if (res.code === 200) {
            this.$message({
              message: "创建任务成功"
            });
            this.getEmailJobList();
            this.cleanExpands();
          }else{
            this.$message({
              message: res.data
            })
          }

        }
      },
      async saveJobRule(rule){
        // 发起创建请求
        const res = await saveJob(rule);
        if (res.code === 200) {
          this.$message({
            message: "创建规则成功"
          });
          rule.id = res.data.id;
          rule.edit = false;
        }else{
          this.$message({
            message: res.data
          })
        }
      },
      async addJob() {
        if (this.tableData[0].edit) {
          this.$message({
            message: "请一条一条来"
          })
        } else {
          this.tableData.unshift({
              id: null,
              name: null,
              sender: null,
              authCode: null,
              typeName: null,
              type: null,
              subject: null,
              context: null,
              edit: true,
              rules: [
                {
                  ruleSort: null,
                  startDate: null,
                  endDate: null,
                  startTime: null,
                  endTime: null,
                  interval: null,
                  edit: true
                }
              ]
            }
          );
          this.cleanExpands();
          this.expands.push(this.tableData[0].id);
        }
        // this.tableData.push(con);
      },
      async cleanExpands(){
        this.expands = [];
      }
    }
  }
</script>

<style>
  .job_search{
    position: absolute;
    top: 15%;
    left: 20%;
    right: 5%;
    height: 10%;
  }
  .job_input{
    position: absolute;
    top: 10%;
    /*left: 3%;*/
  }
  .job_button{
    position: absolute;
    top: 10%;
    right: 5%;
  }
  .job_table{
    position: absolute;
    top: 25%;
    left: 20%;
    right: 5%;
  }
  .job_table input{
    padding: 0 7px;
    height: 30px;
  }
  .table_column{
    width: 20%;
  }
  .table_column_son{
    width: 16%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
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
</style>
