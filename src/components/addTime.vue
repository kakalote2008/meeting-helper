<template>
    <el-main>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="名字" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="项目" prop="project">
                <el-select v-model="form.project"  placeholder="请选择项目">
                    <el-option v-for="item in options" :key="item"  :label="item" :value="item"></el-option>
                </el-select>
                <el-button round size="mini" @click="open">新建</el-button>
            </el-form-item>
            <el-form-item label="日期" prop="date">
                <el-col>
                    <el-date-picker v-model="form.date" type="date" size="large" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="开始" prop="start">
                <el-col>
                    <el-time-select placeholder="开始" v-model="form.start" :picker-options="{
      start: '08:00',
      step: '00:30',
      end: '19:00'
    }">
                    </el-time-select>
                  </el-col>
              </el-form-item>
              
            <el-form-item label="结束" prop="end">
            <el-col>
                    <el-time-select placeholder="结束" v-model="form.end" :picker-options="{
      start: '08:00',
      step: '00:30',
      end: '19:00',
      minTime: form.start
    }">
                    </el-time-select>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        }
      },
      form: {
        name: "",
        project: "",
        date: "",
        start: "",
        end: ""
      },
      rules: {
        project: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写名字', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        start: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        end: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
      },
      options: [""]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    open() {
      this.$prompt("请输入项目名", {
        confirmButtonText: "确定"
      }).then(({ value }) => {
        // console.log(value);
        this.$http
          .post(global.host+"/addProject", { projectName: value })
          .then(
            successCallback => {
              console.log(successCallback);
              this.$message({
                type: "success",
                message: "新建项目: " + value
              });
              this.$router.go(0);
            },
            errorCallback => {
              console.log(errorCallback);
            }
          );
      });
    },
    onSubmit() {
    this.$refs['form'].validate((valid) => {
    console.log(valid);
          if (valid) {
          console.log('submit!!');
            var data = {};
            data = this.$data.form;
            this.$http.post(global.host+"/storeTime", data).then(
              successCallback => {
                // console.log(successCallback);
                this.$router.push({ path: "/show" });
              },
              errorCallback => {
                console.log(errorCallback);
              }
            );
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    fetchData() {
      this.$http.get(global.host+"/getProject").then(
        successCallback => {
          this.$data.options = successCallback.body;
        },
        errorCallback => {
          console.log(errorCallback.body);
        }
      );
    }
  }
};
</script>
