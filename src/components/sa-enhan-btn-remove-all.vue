<template>
  <!-- 全部减一按钮 -->
  <view class="btn-remove-all">
    <!-- 背景层 -->
    <view class="bg"></view>
    <!-- 信息展示层 -->
    <view class="info">
      <view class="info-text">
        全部
        <text class="highlight">-1</text>
      </view>
    </view>
    <!-- 触摸层 -->
    <view class="touch" @click="removeAll"></view>
  </view>
</template>

<script setup lang="ts">
import { useSakuraArms } from '@/stores/sakuraArms';
const sakuraArms = useSakuraArms();
const props = defineProps<{
  primaryAreaName: string;
}>();
// 全部付与牌token数量减一
const removeAll = () => {
  sakuraArms.removeAllEnhanCardToken(props.primaryAreaName);
};
</script>

<style scoped lang="scss">
@import '@/assets/sakuraArms.scss';

// 全部减一按钮
.btn-remove-all {
  width: 100%;
  height: 100%;
  color: #000;
  border-radius: 12px;
  overflow: hidden;

  position: relative;

  .bg {
    background: $area-enhan-bg-color;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .info-text {
      .highlight {
        color: #23c3db;
      }
    }
  }
}
</style>
