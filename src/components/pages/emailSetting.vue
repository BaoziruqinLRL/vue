<template>
  <div>
    <head-top></head-top>
    <div class="search">
      <div class="search_input search_input_box">
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
      <div class="search_button">
        <el-button type="primary" icon="el-icon-search" circle @click="getEmailJobList"></el-button>
        <el-button type="info" icon="el-icon-refresh-right" circle @click="resetSearch"></el-button>
        <el-button type="success" icon="el-icon-plus" circle @click="addJob"></el-button>
      </div>
    </div>
    <div class="job_table">
      <el-table :data="tableData" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expands">
        <el-table-column type="expand">
          <template slot="header" slot-scope="scope">
            <el-button class="el-icon-plus" size="mini" type="success" @click="cleanExpands()" circle></el-button>
          </template>
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
                  <template slot="header" slot-scope="scope">
                    <span>操作&nbsp;&nbsp;</span>
                    <el-button class="el-icon-plus" size="mini" type="success" @click="addJobRule(props.row)" circle></el-button>
                  </template>
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" size="mini" @click="saveJobRule(scope.row)" class="el-icon-check"></el-button>
                    <el-button v-else size="mini" @click="setRuleEdit(scope.row)" class="el-icon-edit"></el-button>
                    <el-button v-if="scope.row.edit" size="mini" type="danger" @click="cancelEditRule(props.row, scope.row)" class="el-icon-circle-close" circle></el-button>
                    <el-button v-else size="mini" type="danger" @click="deleteJobRule(props.row, scope.row)" class="el-icon-delete" circle></el-button>
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
            <el-button v-if="scope.row.edit" size="mini" type="danger" @click="cancelEditJob(scope.row)" class="el-icon-circle-close"></el-button>
            <el-button v-else size="mini" type="danger" @click="deleteJob(scope.row)" class="el-icon-delete"></el-button>
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
  import {deleteJob} from "../../api/getData";
  import {saveJobRule} from "../../api/getData";
  import {deleteJobRule} from "../../api/getData";

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
      async setRuleEdit(data){
        data.edit = true;
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
            } else if (rule.interval === null || rule.interval < 5){
              this.$message({
                message: "规则间隔不能为空 或 小于5分钟"
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
              message: "操作成功"
            });
            this.getEmailJobList();
            this.cleanExpands();
          }else{
            this.$message({
              message: res.message
            })
          }
        }
      },
      async saveJobRule(rule){
        // 发起创建请求
        if (rule.startDate === null){
          this.$message({
            message: "规则开始日期不能为空"
          });
        } else if (rule.startTime === null){
          this.$message({
            message: "规则开始时间不能为空"
          });
        } else if (rule.interval === null || rule.interval < 5){
          this.$message({
            message: "规则间隔不能为空 或 小于5分钟"
          });
        }else {
          const res = await saveJobRule(rule);
          if (res.code === 200) {
            this.$message({
              message: "操作成功"
            });
            rule.id = res.data.id;
            rule.edit = false;
          } else {
            this.$message({
              message: res.message
            })
          }
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
                  id: null,
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
      },
      async addJobRule(job){
        job.rules.push({
          id: null,
          emailId: job.id,
          ruleSort: null,
          startDate: null,
          endDate: null,
          startTime: null,
          endTime: null,
          interval: null,
          edit: true
        })
      },
      async cleanExpands(){
        this.expands = [];
      },
      async deleteJob(job){
        this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await deleteJob({emailId: job.id});
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getEmailJobList();
          }else{
            this.$message({
              message: res.message
            })
          }
        });
      },
      async deleteJobRule(job,rule){
        if (job.rules.length === 1) {
          this.$message({
            message: "任务至少保留一条规则"
          })
        }else{
          // 删除规则
          const res = await deleteJobRule(rule);
          if (res.code === 200) {
            this.$message({
              message: "操作成功"
            });
            let rules = [];
            job.rules.forEach(r => {
              if (r.id !== rule.id){
                rules.push(r);
              }
            });
            job.rules = [];
            job.rules = rules;
          }else{
            this.$message({
              message: res.data
            })
          }
        }
      },
      async cancelEditJob(job){
        if (job.id === null) {
          this.tableData.splice(this.tableData.indexOf(job), 1);
        }else{
          job.edit = false;
        }
      },
      async cancelEditRule(job,rule){
        if (job.rules.length === 1){
          this.$message({
            message: "至少创建一条规则"
          })
        }else {
          if (rule.id === null) {
            job.rules.splice(job.rules.indexOf(rule), 1);
          } else{
            rule.edit = false;
          }
        }
      }
    }
  }
</script>

<style>
  @import '../../style/greenYellowSearchStype.css';
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
</style>
