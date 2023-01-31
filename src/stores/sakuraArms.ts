import { defineStore } from 'pinia';
import { computed, ref, toDisplayString } from 'vue';
import _ from 'lodash';

export const useSakuraArms = defineStore('sakuraArms', () => {
  // 初始状态 考虑到未来的功能扩展，仍保留回合数，回合玩家等数据
  const initialState = {
    // 当前回合
    turn: {
      turnCount: 1,
      turnPlayer: 'player1'
    },
    // 公共区域
    shared: {
      distance: {
        count: 10,
        limit: 10
      },
      shadow: {
        count: 0,
        limit: null
      }
    },
    // 玩家一
    player1: {
      // 装
      aura: {
        count: 3,
        limit: 5
      },
      // 命
      life: {
        count: 10,
        limit: null
      },
      // 气
      flare: {
        count: 0,
        limit: null
      },
      // 付与牌
      enhancementA: {
        order: 'A',
        count: 0,
        show: true,
        limit: null
      },
      enhancementB: {
        order: 'B',
        count: 0,
        show: true,
        limit: null
      },
      enhancementC: {
        order: 'C',
        count: 0,
        show: true,
        limit: null
      },
      enhancementD: {
        order: 'D',
        count: 0,
        show: false,
        limit: null
      },
      enhancementE: {
        order: 'E',
        count: 0,
        show: false,
        limit: null
      },
      enhancementF: {
        order: 'F',
        count: 0,
        show: false,
        limit: null
      },
      enhancementG: {
        order: 'G',
        count: 0,
        show: false,
        limit: null
      }
    },
    // 玩家二
    player2: {
      // 装
      aura: {
        count: 3,
        limit: 5
      },
      // 命
      life: {
        count: 10,
        limit: null
      },
      // 气
      flare: {
        count: 0,
        limit: null
      },
      // 付与牌
      enhancementA: {
        order: 'A',
        count: 0,
        show: true,
        limit: null
      },
      enhancementB: {
        order: 'B',
        count: 0,
        show: true,
        limit: null
      },
      enhancementC: {
        order: 'C',
        count: 0,
        show: true,
        limit: null
      },
      enhancementD: {
        order: 'D',
        count: 0,
        show: false,
        limit: null
      },
      enhancementE: {
        order: 'E',
        count: 0,
        show: false,
        limit: null
      },
      enhancementF: {
        order: 'F',
        count: 0,
        show: false,
        limit: null
      },
      enhancementG: {
        order: 'G',
        count: 0,
        show: false,
        limit: null
      }
    }
  };

  // 当前状态
  const currentState = ref({});

  // 恢复初始状态
  const resetState = () => {
    // 清除本地存储数据
    localStorage.removeItem("sakuraArms")
    // 将当前状态重置回初始状态
    currentState.value = JSON.parse(JSON.stringify(initialState));
  };

  // #region 获取和存储数据
  // 把数据存储到本地
  const saveToStorage = () => {
    localStorage.setItem('sakuraArms', JSON.stringify(currentState.value));
  };

  // 从本地获取数据，如果无则设定为默认值
  const getFromStorage = () => {
    currentState.value = localStorage.getItem('sakuraArms') ? JSON.parse(localStorage.getItem('sakuraArms')) : JSON.parse(JSON.stringify(initialState));
  };
  //#endregion

  //#region 修改token数量
  // 减token数量，无法再减则返回false，否则返回true
  const minusToken = (primaryIndex: string, areaName: string) => {
    // 如果当前token数量小于等于零，则不修改
    if (_.get(currentState.value, `${primaryIndex}.${areaName}.count`) <= 0) {
      return false;
    }
    _.update(currentState.value, `${primaryIndex}.${areaName}.count`, n => n - 1);
    // 修改数据后存储到本地
    saveToStorage();

    return true;
  };

  // 加token数量，无法再添加则返回false，否则返回true
  const addToken = (primaryIndex: string, areaName: string) => {
    let limit = _.get(currentState.value, `${primaryIndex}.${areaName}.limit`);
    // 如果有上限且当前token数量已达/超过上限，则不变化
    if (limit != null) {
      if (_.get(currentState.value, `${primaryIndex}.${areaName}.count`) >= limit) {
        return false;
      }
    }
    _.update(currentState.value, `${primaryIndex}.${areaName}.count`, n => n + 1);
    // 修改数据后存储到本地
    saveToStorage();

    return true;
  };
  //#endregion

  //#region 付与牌相关
  // 添加付与牌
  const addEnhanCard = (primaryIndex: string) => {
    for (let i in currentState.value[primaryIndex]) {
      // 将编号最靠前的、show为false的付与牌设置为显示
      if (i.indexOf('enhancement') != -1 && !currentState.value[primaryIndex][i]['show']) {
        currentState.value[primaryIndex][i]['show'] = true;
        return;
      }
    }
    // 修改数值后存储到本地
    saveToStorage();
  };

  // 全部付与牌减一
  const removeAllEnhanCardToken = (primaryIndex: string) => {
    for (let i in currentState.value[primaryIndex]) {
      // 全部count大于0、且show为true的付与牌的token数量减一
      if (i.indexOf('enhancement') != -1 && currentState.value[primaryIndex][i]['show'] && currentState.value[primaryIndex][i]['count'] > 0) {
        currentState.value[primaryIndex][i]['count'] -= 1;
      }
    }
    // 修改数值后存储到本地
    saveToStorage();
  };
  //#endregion

  //#region token数量计算，以及抵消差值函数
  // 理论总的token数量
  const totalTokenCount = ref(36);

  // 当前token总数
  const currentTotalTokenCount = computed(() => {
    let count = 0;
    // 公共区域token数量计算
    for (let i in currentState.value.shared) {
      count += currentState.value.shared[i].count;
    }
    // player1区域token数量计算
    for (let i in currentState.value.player1) {
      count += currentState.value.player1[i].count;
    }
    // player2区域token数量计算
    for (let i in currentState.value.player2) {
      count += currentState.value.player2[i].count;
    }
    return count;
  });

  // 当前token差值
  const tokenDifference = computed(() => {
    return currentTotalTokenCount.value - totalTokenCount.value;
  });

  // 使用「虚」token数量来抵消差值
  const offsetTokenDifference = () => {
    // 当差值为零时，不进行任何操作
    if (tokenDifference.value === 0) {
      return;
    }
    // 当「虚」中token数量大于等于差值（无论正负数），虚中token数量直接减去差值
    if (currentState.value.shared.shadow.count >= tokenDifference.value) {
      currentState.value.shared.shadow.count -= tokenDifference.value;
    }
    // 当「虚」中token数量小于差值（无论正负数），将虚中token清零
    if (currentState.value.shared.shadow.count < tokenDifference.value) {
      currentState.value.shared.shadow.count = 0;
    }
  };
  //#endregion

  //#region 弹窗相关
  const isResetShow = ref(false)
  const isHelpShow = ref(false)
  //#endregion

  return { resetState, currentState, saveToStorage, getFromStorage, minusToken, addToken, addEnhanCard, removeAllEnhanCardToken, tokenDifference, offsetTokenDifference, isResetShow, isHelpShow };
});
