
<template>
  <div id="app">
    <el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">
        提交
      </el-menu-item>
      <el-menu-item index="2">
        统计
      </el-menu-item>
      <el-menu-item index="3">
        预测
      </el-menu-item>
      <el-menu-item index="4">
        删除
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.$router.push({ path: "/addTime" });
      } else if (key == 2) {
        this.$router.push({ path: "/show" });
      } else if (key == 3) {
        this.$router.push({ path: "/predict" });
      } else if (key == 4) {
        this.open();
      }
    },
    open() {
      this.$prompt("请输入项目名", {
        confirmButtonText: "确定"
      }).then(({ value }) => {
        // console.log(value);
        this.$http
          .post(global.host + "/deleteProject", { projectName: value })
          .then(
            successCallback => {
              this.$message({
                type: "success",
                message: "已删除项目: " + value
              });
              this.$router.push({ path: "/addTime" });
            },
            errorCallback => {
              console.log(errorCallback.body);
            }
          );
      });
    }
  }
};
</script>
