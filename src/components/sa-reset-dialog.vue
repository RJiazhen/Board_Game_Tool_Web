<template>
  <!-- 重置按钮弹窗 -->
  <el-dialog class="dialog" v-model="skauraArms.isResetShow" width="70%" align-center center>
    <div class="dialog-info">是否重置？</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="skauraArms.isResetShow = false" size="large">取消</el-button>
        <el-button type="primary" @click="confirmReset" size="large">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useSakuraArms } from "@/stores/sakuraArms"
const skauraArms = useSakuraArms()

// 确认重置
const confirmReset = () => {
  skauraArms.resetState();
  skauraArms.isResetShow = false
};
</script>

<style lang="scss">
@import "@/assets/sakuraArms.scss";

.dialog {
  border-radius: $menu-btn-open-n-close-rect-border-radius;

  .dialog-info {
    font-size: 25px;
    font-weight: 600;
    color: #a43737;
    display: block;
    text-align: center;
  }

  .dialog-footer {
    display: flex;
    justify-content: space-around;
  }
}
</style>
