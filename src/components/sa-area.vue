<template>
  <view class="area">
    <!-- 背景层 -->
    <view class="bg">
      <view class="bg-left" :class="minusActivate ? 'activated' : ''"></view>
      <view class="bg-right" :class="addActivate ? 'activated' : ''"></view>
    </view>
    <!-- 信息展示层 -->
    <view class="info">
      <view class="name">{{ areaNameZh }}</view>
      <view class="icon">
        <img class="icon-img" :src="iconSrc" />
      </view>
      <!-- 变化数字弹出 -->
      <view class="change-count-area">
        <view class="change-count" :class="changeCountStyle">
          <text v-if="changeCount > 0">+</text>
          <text>{{ changeCount }}</text>
        </view>
      </view>
      <view class="token token-count" :class="fontClass">{{ tokenCount }}</view>
      <view class="token token-limit">/ {{ tokenLimit === null ? '∞' : tokenLimit }}</view>
      <!-- 减号 -->
      <view class="minus">
        <img class="sign" src="./icons/minus.svg" />
      </view>
      <!-- 加号 -->
      <view class="add">
        <img class="sign" src="./icons/add.svg" />
      </view>
    </view>

    <!-- 触摸层 -->
    <view class="touch">
      <view class="touch-left" @click="minus"></view>
      <view class="touch-right" @click="add"></view>
    </view>
  </view>
</template>

<script setup lang="ts">

import shadowIcon from './icons/shadow_icon.svg'
import distanceIcon from './icons/distance_icon.svg'
import auraIcon from './icons/aura_icon.svg'
import flareIcon from './icons/flare_icon.svg'
import lifeIcon from './icons/life_icon.svg'
import { computed, ref } from 'vue';
import { useSakuraArms } from '@/stores/sakuraArms';
import _ from 'lodash';

const sakuraArms = useSakuraArms();

const props = defineProps<{
  primaryAreaName: string;
  areaName: string;
}>();

// 区域名称列表
const areaNames = {
  shadow: '虛',
  distance: '距',
  aura: '裝',
  flare: '氣',
  life: '命'
};
// 本区域名称
const areaNameZh = computed(
  (): string => {
    return _.get(areaNames, props.areaName);
  }
);

// 区域图标列表
const iconSrcs = {
  shadow: shadowIcon,
  distance: distanceIcon,
  aura: auraIcon,
  flare: flareIcon,
  life: lifeIcon
};
// 本区域图标
const iconSrc = computed(
  (): string => {
    return _.get(iconSrcs, props.areaName);
  }
);

// 区域字体背景列表
const fontClasses = {
  shadow: 'token-count-shadow',
  distance: 'token-count-distance',
  aura: 'token-count-aura',
  flare: 'token-count-flare',
  life: 'token-count-life'
};
// 本区域字体背景
const fontClass = computed(
  (): string => {
    return _.get(fontClasses, props.areaName);
  }
);

// 本区域token数量
const tokenCount = computed(() => {
  return _.get(sakuraArms.currentState, `${props.primaryAreaName}.${props.areaName}.count`);
});
// 本区域token上限
const tokenLimit = computed(() => {
  return _.get(sakuraArms.currentState, `${props.primaryAreaName}.${props.areaName}.limit`);
});

// 控制按下按钮时的样式变化
const minusActivate = ref(false);
const addActivate = ref(false);

// 恢复减token相关的样式为未激活
const inactivateMinus = _.debounce(() => {
  minusActivate.value = false;
}, 700);
// 修改加token相关的样式为未激活
const inactivateAdd = _.debounce(() => {
  addActivate.value = false;
}, 700);

// 变化的量
const changeCount = ref(0);
// 对应的样式
const changeCountStyle = computed(() => {
  if (changeCount.value === 0) {
    return 'no-change';
  }
  if (changeCount.value < 0) {
    return 'minus-count';
  }
  if (changeCount.value > 0) {
    return 'add-count';
  }
});
// 恢复changeCount为0
const resetChangeCount = _.debounce(() => {
  changeCount.value = 0;
}, 1000);

// 减少token
const minus = () => {
  // 成功减少则修改changeCount
  if (sakuraArms.minusToken(props.primaryAreaName, props.areaName)) {
    changeCount.value -= 1;
    // 将changeCount重置为0 （1s延迟）
    resetChangeCount();
  }
  // 修改样式
  minusActivate.value = true;
  // 然后恢复为未激活状态（500s延迟）
  inactivateMinus();
};

// 增加token
const add = () => {
  if (sakuraArms.addToken(props.primaryAreaName, props.areaName)) {
    changeCount.value += 1;
    // 将changeCount重置为0 （1s延迟）
    resetChangeCount();
  }
  // 修改样式
  addActivate.value = true;
  // 然后恢复为未激活状态（500s延迟）
  inactivateAdd();
};
</script>

<style scoped lang="scss">
@import '@/assets/sakuraArms.scss';

.area {
  height: 100%;
  border-radius: 12px;
  overflow: hidden;

  position: relative;
}
</style>
