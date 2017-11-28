<template>
  <el-table :data="tableData" border highlight-current-row style="width: 100%">
    <el-table-column prop="project" label="项目">
    </el-table-column>
    <el-table-column prop="date" label="日期">
    </el-table-column>
    <el-table-column prop="start" label="start">
    </el-table-column>
    <el-table-column prop="end" label="end">
    </el-table-column>
  </el-table>
</template>

  <script>
export default {
  data() {
    return {
      tableData: [
      ]
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http.get(global.host+"/predictData").then(
        successCallback => {
            console.log(successCallback.body)
            var result = successCallback.body;
            for (var key in result){
                for (var k in result[key]){
                    result[key][k]["project"] = key;
                    this.$data.tableData.push(result[key][k]);
                }
            }
        },
        errorCallback => {
          console.log(errorCallback.body);
        }
      );
    }
  }
};
</script>
