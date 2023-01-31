<template>
  <view class="container">
    <view class="game-board">
      <SaPlayer class="player player1" playerName="player1"></SaPlayer>
      <SaPlayer class="player player2" playerName="player2"></SaPlayer>
      <!-- 中心菜单 -->
      <!-- FIXME 这里直接在 -->
      <SaMenu class="menu"></SaMenu>
      <SaResetDialog></SaResetDialog>
      <SaHelpDialog></SaHelpDialog>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSakuraArms } from '@/stores/sakuraArms';
// import type saHelpDialogVue from '@/components/sa-help-dialog.vue';

const sakuraArms = useSakuraArms();
onMounted(() => {
  sakuraArms.getFromStorage();
})
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  position: fixed;
  background: linear-gradient(180.05deg, #b0c1d9 -2.17%, #f2d5db 99.95%);
  padding: 10px 0 10px;

  // 游戏版图
  .game-board {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    .player {
      // 玩家面板之间有8px的间距
      height: calc(50% - 4px);
    }

    .player:nth-child(1) {
      margin-bottom: 8px;
    }

    .player1 {
      transform: rotate(180deg);
    }

    .player2 {
      left: 0%;
    }
  }

  // 中心菜单
  .menu {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
  }
}
</style>
