<template>
  <el-table :data="tableData" border highlight-current-row>
    <el-table-column prop="project" label="项目">
    </el-table-column>
    <el-table-column prop="name" label="姓名">
    </el-table-column>
    <el-table-column prop="date" label="日期" style="width:20%">
    </el-table-column>
    <el-table-column prop="start" label="start">
    </el-table-column>
    <el-table-column prop="end" label="end">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click.native.prevent="deleteRow(scope.$index, tableData,scope.row)" type="text" size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

  <script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http.get(global.host + "/getshow").then(
        successCallback => {
          if (successCallback.body.length > 0) {
            // console.log(successCallback.body)
            this.$data.tableData = successCallback.body;
          }
        },
        errorCallback => {
          console.log(errorCallback.body);
        }
      );
    },
    deleteRow(index, tableData,row) {
      tableData.splice(index, 1);
      this.$http
        .post(global.host + "/delete", {
          "project": row.project,
          "name": row.name,
          "date": row.date,
          "start": row.start,
          "end": row.end
        })
        .then(
          successCallback => {},
          errorCallback => {
            console.log(errorCallback.body);
          }
        );
    }
  }
};
</script>
