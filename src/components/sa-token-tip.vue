<template>
  <view class="token-tip" :class="activate ? 'activated' : ''" @click="clickTip()">
    <img class="token-icon" src="./icons/sakura_token_icon.svg" mode="" />
    <view class="token-count" :class="tokenCountStyle">
      <text v-if="sakuraArms.tokenDifference > 0">+</text>
      <text v-if="sakuraArms.tokenDifference === 0">&nbsp;</text>
      <text>{{ sakuraArms.tokenDifference }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import _ from 'lodash';
import { useSakuraArms } from '@/stores/sakuraArms';
const sakuraArms = useSakuraArms();

// 控制按下时的样式变化
const activate = ref(false);
// 将样式改成未激活状态（700ms延迟）
const inactivate = _.debounce(() => {
  activate.value = false;
}, 700);
// 按下tip组件时
const clickTip = () => {
  sakuraArms.offsetTokenDifference();
  activate.value = true;
  inactivate();
};
// 数字样式
const tokenCountStyle = computed(() => {
  if (sakuraArms.tokenDifference > 0) {
    return 'add-count';
  }
  if (sakuraArms.tokenDifference < 0) {
    return 'minus-count';
  }
  return '';
});
</script>

<style scoped lang="scss">
@import '@/assets/sakuraArms.scss';

.token-tip {
  width: $token-tip-width;
  height: $token-tip-height;
  background: $area-normal-bg-color;
  border: 1px solid $token-tip-boader-color;
  border-radius: calc($token-tip-height / 2);

  overflow: hidden;
  position: relative;

  transition: all $menu-animation-time;

  &.activated {
    background-color: #aaa3ae;
  }

  .token-icon {
    position: absolute;
    width: $token-tip-icon-size;
    height: $token-tip-icon-size;
    left: -5px;
    top: 50%;

    transform: translate(0, -50%) rotate(-52deg);
  }

  .token-count {
    position: absolute;
    width: calc($token-tip-token-count * 2);
    height: $token-tip-token-count;
    right: 8px;
    top: calc(50% - $token-tip-token-count/2);

    text-align: end;
    font-size: $token-tip-token-count;
    line-height: $token-tip-token-count;

    color: #c7cdd0;
    -webkit-text-stroke: 0.2px #bfc3c6;

    &.add-count {
      color: #cf6379;
    }

    &.minus-count {
      color: #23c3db;
    }
  }
}
</style>
