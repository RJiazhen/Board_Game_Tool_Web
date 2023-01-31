<template>
  <div class="player" id="player">
    <div class="board-view">
      <div class="boards">
        <!-- 面板一 -->
        <div class="board board-1">
          <!-- 公共区域 -->
          <div class="shared">
            <!-- 虚 -->
            <SaArea class="sa-area" primaryAreaName="shared" areaName="shadow" style="width: 50%">
            </SaArea>
            <!-- 距 -->
            <SaArea primaryAreaName="shared" areaName="distance" style="width: 50%">
            </SaArea>
          </div>
          <!-- 个人区域 -->
          <div class="personal">
            <!-- 装 -->
            <SaArea class="sa-area" :primaryAreaName="props.playerName" areaName="aura" style="width: 33%">
            </SaArea>
            <!-- 气 -->
            <SaArea class="sa-area" :primaryAreaName="props.playerName" areaName="flare" style="width: 33%">
            </SaArea>
            <!-- 命 -->
            <SaArea class="sa-area" :primaryAreaName="props.playerName" areaName="life" style="width: 33%">
            </SaArea>
          </div>
          <!-- 樱花数量提示区域 -->
          <SaTokenTip class="token-tip"></SaTokenTip>
        </div>
        <!-- 面板二 -->
        <div class="board board-2">
          <!-- 付与牌区域 -->
          <SaEnhanCard class="enhan-card" v-for="(card, index) in enhans" :key="index"
            :primaryAreaName="props.playerName" :order="card.order">
          </SaEnhanCard>
          <!-- 添加付与牌按钮 -->
          <SaEnhanBtnAdd class="enhan-btn-add" :primaryAreaName="props.playerName"></SaEnhanBtnAdd>
          <!-- 全部付与牌减一按钮 -->
          <SaEnhanBtnRemoveAll class="enhan-btn-remove-all" :primaryAreaName="props.playerName">
          </SaEnhanBtnRemoveAll>
          <!-- token数量提示 -->
          <SaTokenTip class="token-tip"></SaTokenTip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
} from 'vue'
import {
  useSakuraArms
} from '@/stores/sakuraArms'

const sakuraArms = useSakuraArms()
const props = defineProps<{
  playerName: string
}>()

// 当前组件实例
let cur = getCurrentInstance()

// 当前要显示的付与牌列表
const enhans = computed(() => {
  let enhans = []
  for (let i in sakuraArms.currentState[props.playerName]) {
    if (i.indexOf('enhancement') != -1 && sakuraArms.currentState[props.playerName][i]['show']) {
      enhans.push(sakuraArms.currentState[props.playerName][i])
    }
  }
  return enhans
})
</script>

<style scoped lang="scss">
.player {
  width: 100%;
  height: 100%;

  position: relative;

  .board-view {
    width: 100%;
    height: 100%;
    overflow-x: scroll;

    .boards {
      width: 200%;
      height: 100%;
      display: flex;
      top: 0;

      .board {
        width: 100vw;
        height: 100%;
        padding: 0px 10px 0;
        position: relative;
      }

      // 面板一
      .board-1 {

        .token-tip {
          position: absolute;
          top: calc(42% - 0px);
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .shared {
          // 预留3px的间距
          height: calc(42% - 3px);
          margin-bottom: 3px;
          display: flex;

          .sa-area:nth-child(1) {
            margin-right: 3px;
          }
        }


        .personal {
          height: 58%;
          display: flex;


          .sa-area:nth-child(-n+2) {
            margin-right: 3px;

          }
        }
      }

      // 面板二
      .board-2 {
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;

        // 单张付与牌
        .enhan-card {
          // 宽度是扣除外侧盒子的padding以及.enhan-card自己的margin-righ再除3
          // 从而保证每行3个付与牌区域，且各间距固定，还能左对齐
          width: calc((100vw - 26px) / 3);
          height: 58%;
          margin-right: 3px;

          &:nth-child(3n) {
            margin-right: 0;
          }

          &:nth-child(n+4) {
            margin-top: 3px;
          }
        }

        // 添加付与牌按钮
        .enhan-btn-add {
          width: calc((100vw - 26px) / 3);
          height: 58%;
          margin-top: 3px;
        }

        // 全部付与牌减一按钮
        .enhan-btn-remove-all {
          width: calc((100vw - 26px) / 3);
          height: 58%;
          margin-left: 3px;
          margin-top: 3px;
        }

        // token数量提示区域
        .token-tip {
          position: absolute;
          top: 58%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
