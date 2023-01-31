<template>
  <!-- 添加付与牌按钮 -->
  <view class="btn-add">
    <!-- 背景层 -->
    <view class="bg"></view>
    <!-- 信息展示层 -->
    <view class="info">
      <view class="info-text">
        添加
        <br />
        付与牌
      </view>
      <image class="info-icon" src="./images/add_square_icon.svg" mode="aspectFit"></image>
    </view>
    <!-- 触摸层 -->
    <view class="touch" @click="addEnhanCard"></view>
  </view>
</template>

<script setup lang="ts">
import { useSakuraArms } from '@/stores/sakuraArms';
const sakuraArms = useSakuraArms();
const props = defineProps<{
  primaryAreaName: string;
}>();

// 添加付与牌
const addEnhanCard = () => {
  sakuraArms.addEnhanCard(props.primaryAreaName);
};
</script>

<style scoped lang="scss">
@import '@/assets/sakuraArms.scss';

// 添加付与牌按钮
.btn-add {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;

  position: relative;

  // 背景层
  .bg {
    background: $area-enhan-bg-color;
  }

  // 信息展示层
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
