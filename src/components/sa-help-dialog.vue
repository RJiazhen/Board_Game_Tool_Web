<template>
  <!-- 帮助按钮弹窗 -->
  <el-dialog v-model="sakuraArms.isHelpShow" title="帮助说明" width="70%" center align-center>
    <div class="helpInfo">
      <ul>
        <li class="help-text">
          <img class="help-text-img" src="./icons/center_btn.svg" height="30" />
          <text>：打开菜单</text>
        </li>
        <li class="help-text">
          <img class="help-text-img" src="./icons/sakura_token_tip.svg" height="20" />
          <text>：指示物数量提示。</text>
          <text class="help-text-highlight">点击</text>
          <text>则将指示物放入「虚」或从「虚」中尽可能取走指示物</text>
        </li>
        <li class="help-text">
          <img class="help-text-img" src="./icons/help_tip.png" />
          <text class="help-text-highlight">左划</text>
          <text>切换至「付与牌」面板</text>
        </li>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="sakuraArms.isHelpShow = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useSakuraArms } from "@/stores/sakuraArms"
const sakuraArms = useSakuraArms()

</script>

<style scoped lang="scss">
.helpInfo {

  // 单段说明文本
  .help-text {
    width: 100%;
    margin: 0 auto 10px;
    text-align: justify;

    .help-text-img {
      // width: 50px;
      // height: 30px;
      vertical-align: middle;
    }

    .help-text-highlight {
      font-weight: 600;
    }

    // 最后那张说明图片
    &:nth-child(3) {
      .help-text-img {
        display: block;
        width: 90%;
      }
    }
  }
}
</style>
