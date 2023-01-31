<template>

  <div class="menu-container">
    <!-- 环型菜单 -->
    <div class="circle-menu" :class="isActive">
      <!-- 菜单边框 -->
      <div class="menu-border" :class="isActive"></div>
      <!-- 按钮轮盘 -->
      <div class="btn-wheel" :class="isActive">
        <div class="btn" :class="isActive" v-for="(btn, index) in btnList" :key="index" @click="btn.func">
          <img class="btn-icon" :class="isActive" :src="btn.icon" />
          <text class="btn-name" :class="isActive">{{ btn.name }}</text>
        </div>
      </div>
    </div>
    <!-- 中心按钮 -->
    <div class="center-btn" :class="isBtnAcitve" @click="changeActive">
      <!-- 按钮背景 -->
      <div class="center-btn-bg"></div>
      <!-- 打开按钮 -->
      <div class="btn-open" :class="isBtnAcitve">
        <div class="rect" :class="isBtnAcitve"></div>
        <div class="rect" :class="isBtnAcitve"></div>
        <div class="rect" :class="isBtnAcitve"></div>
      </div>
      <!-- 关闭按钮 -->
      <div class="btn-close" :class="isBtnAcitve">
        <div class="rect" :class="isBtnAcitve"></div>
        <div class="rect" :class="isBtnAcitve"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useSakuraArms } from '@/stores/sakuraArms';
import resetIcon from './icons/reset_icon.svg'
import helpIcon from './icons/help_icon.svg'
const sakuraArms = useSakuraArms();

// 当前激活状态
const isActive = ref('unactivated');
// 控制按钮激活状态的变量
const isBtnAcitve = ref('unactivated');

// 改变激活状态
const changeActive = () => {
  // 需要先设置样式为空，然后再切换样式，以保证动画能再次执行
  if (isActive.value === 'unactivated') {
    isActive.value = 'activated';
    isBtnAcitve.value = '';
    const timer = setTimeout(() => {
      isBtnAcitve.value = 'activated';
      clearTimeout(timer);
    }, 10);
  } else {
    isActive.value = 'unactivated';
    isBtnAcitve.value = '';
    const timer = setTimeout(() => {
      isBtnAcitve.value = 'unactivated';
      clearTimeout(timer);
    }, 10);
  }
};
// 环型菜单列表
const btnList = [
  {
    name: '重置',
    icon: resetIcon,
    func: () => {
      sakuraArms.isResetShow = true
      changeActive();
    }
  },
  {
    name: '帮助',
    icon: helpIcon,
    func: () => {
      sakuraArms.isHelpShow = true
      changeActive();
    }
  }
];



// 帮助按钮相关函数
const isHelpShow = ref(false)
const closeHelp = () => {
  isHelpShow.value = false
};
// 首次打开时自动打开帮助说明
onMounted(() => {
  // 获取本次存储的数据判断是否是首次打开
  const isFirst = localStorage.getItem('isFirst') ? false : true;
  // 如果是首次打开则显示帮助信息
  if (isFirst) {
    const timer = setTimeout(() => {
      isHelpShow.value = true
      clearTimeout(timer);
    }, 500);
  }
  localStorage.setItem('isFirst', 'false');
});
</script>

<style scoped lang="scss">
@import '@/assets/sakuraArms.scss';

.dialog {
  position: absolute;
}

.menu-container {
  position: relative;

  // 环型菜单
  .circle-menu {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;

    transition: all $menu-animation-time;

    // 未激活状态的circle-menu
    &.unactivated {
      width: 0;
      height: 0;
    }

    // 已激活状态的circle-menu
    &.activated {
      width: $menu-border-size;
      height: $menu-border-size;
    }

    // 外圈边框
    .menu-border {
      border-radius: 50%;
      background: conic-gradient(from 180deg at 50% 50%,
          #f0f1f2 -26.25deg,
          #f2d5db 50.63deg,
          rgba(102, 93, 115, 0.84375) 127.5deg,
          rgba(120, 119, 140, 0.609447) 210deg,
          #b0c1d9 279.38deg,
          #f0f1f2 333.75deg,
          #f2d5db 410.62deg);
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      transition: all $menu-animation-time;

      // 未激活状态的menu-border
      &.unactivated {
        width: 0;
        height: 0;
      }

      // 已激活状态的menu-border
      &.activated {
        width: $menu-border-size;
        height: $menu-border-size;
      }
    }

    // 按钮轮盘
    .btn-wheel {
      background: #f7f8fc;
      border-radius: 50%;

      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      transition: all $menu-animation-time;

      // 未激活状态的btn-wheel
      &.unactivated {
        width: 0;
        height: 0;
      }

      // 已激活状态的btn-wheel
      &.activated {
        width: $menu-btn-wheel-size;
        height: $menu-btn-wheel-size;
      }

      // 按钮
      .btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform-origin: center -50px;
        translate: -50% calc(10px + 50%);

        display: flex;
        flex-direction: column;
        align-items: center;

        transition: all $menu-animation-time;

        // 将其中一个按钮旋转到对侧
        &:nth-child(1) {
          rotate: 180deg;
        }

        // 未激活状态的btn
        &.unactivated {
          width: 0;
          height: 0;
          translate: 0 0;

          // TODO 找到一个让全部按钮都直线缩回正中央的方法
          // 将其中一个按钮旋转到对侧
          &:nth-child(1) {
            translate: 0 calc($menu-btn-wheel-size / 2 - $menu-btn-height);
          }
        }

        // 已激活状态的btn
        &.activated {
          width: $menu-btn-width;
          height: $menu-btn-height;
        }

        // 按钮图标
        .btn-icon {
          transition: all $menu-animation-time;

          // 未激活状态的btn-icon
          &.unactivated {
            width: 0;
            height: 0;
          }

          // 已激活状态的btn-icon
          &.activated {
            width: $menu-btn-icon-size;
            height: $menu-btn-icon-size;
          }
        }

        // 按钮名称
        .btn-name {
          transition: all $menu-animation-time;

          // 未激活状态的btn-name
          &.unactivated {
            font-size: 0;
            line-height: 0;
          }

          // 已激活状态的btn-name
          &.activated {
            font-size: $menu-btn-name-font-size;
            line-height: $menu-btn-name-font-size;
          }
        }
      }
    }
  }

  // 中心按钮
  .center-btn {
    position: relative;

    // 按钮背景
    .center-btn-bg {
      width: $menu-center-btn-bg-size;
      height: $menu-center-btn-bg-size;

      background: #d3d3d3;
      border-radius: $menu-center-btn-bg-border-size;
      transform: rotate(-45deg);
    }

    // 打开菜单按钮，默认为显示状态
    .btn-open {
      width: $menu-btn-open-n-close-size;
      height: $menu-btn-open-n-close-size;
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      transition: all $menu-animation-time;
      // transition: all calc($menu-animation-time * 2);

      // 已激活状态
      &.activated {
        width: 0;
        height: 0;
      }

      // 打开菜单按钮矩形，默认为未激活状态
      .rect {
        width: $menu-btn-open-rect-width;
        height: $menu-btn-open-rect-height;
        background: #000000;
        border-radius: $menu-btn-open-n-close-rect-border-radius;
        position: absolute;
        left: calc(50% - $menu-btn-open-rect-width / 2);
        top: calc(50% - $menu-btn-open-rect-height);
        transition: all $menu-animation-time;
        transform-origin: center;

        // 未激活状态
        &.unactivated {
          &:nth-child(1) {
            translate: 0 $menu-btn-open-rect-translateY;
          }

          &:nth-child(3) {
            translate: 0 calc(0px - $menu-btn-open-rect-translateY);
          }
        }

        // 已激活状态，此时所有矩形都集中到最重要，且消失
        &.activated {
          width: 0;
          height: 0;

          left: 50%;
          top: 50%;
          translate: -50% -50%;
        }
      }
    }

    // 关闭菜单按钮，默认为未显示状态
    .btn-close {
      width: 0;
      height: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      transition: all $menu-animation-time;

      // 已激活状态
      &.activated {
        width: $menu-btn-open-n-close-size;
        height: $menu-btn-open-n-close-size;
      }

      // 关闭菜单按钮矩形，默认为未激活状态
      .rect {
        // display: none;
        width: 0;
        height: 0;
        background: #000000;
        border-radius: $menu-btn-open-n-close-rect-border-radius;

        position: absolute;
        left: 50%;
        top: 50%;
        translate: -50% -50%;

        transition: all $menu-animation-time;

        // 已激活状态
        &.activated {
          display: block;
          width: $menu-btn-close-rect-width;
          height: $menu-btn-close-rect-height;

          &:nth-child(1) {
            rotate: -45deg;
          }

          &:nth-child(2) {
            rotate: 45deg;
          }
        }
      }
    }
  }


}
</style>
