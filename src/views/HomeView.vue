<template>
  <div class="home">
    <div class="info">
      <img alt="logo" class="logo" src="@/assets/logo.png" width="50" height="50" />
      <h1>我的工具</h1>
      <p>收录我个人制作的一些小工具</p>
    </div>
    <div class="tools">
      <div class="tool-cate">
        <h2 class="tool-title">桌游相关</h2>
        <ul class="tools-list">
          <li>
            <routerLink class="tool-item" to="SakuraArms">
              <img src="@/assets/sakura_arms_icon.png" alt="Sakura arms logo">
              <p>散樱乱武计数面板</p>
            </routerLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }

  // 工具列表
  .tools {
    .tool-cate {
      .tool-title {
        text-align: center;
        margin-bottom: 20px;
      }

      .tools-list {
        width: 100%;

        .tool-item {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            width: 100px;
          }

          p {
            text-align: center;
          }
        }
      }
    }

  }
}


@media (min-width: 1024px) {
  .home {
    width: 1024px;
    flex-direction: row;

    .info {
      width: 250px;
      margin: 0;
    }

    .tools {
      width: 750px;
    }
  }

}
</style>
