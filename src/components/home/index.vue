<template lang="pug">
.common-layout.nav
  .page-content
    el-row
      el-col(:span="12")
        .left
          span.logo Aaron.BOOKING
      el-col(:span="12")
        .right(v-if="!isLogin")
          el-button(
            @click="() => handleLoginState('login')"
            color="#248266"
            type="primary"
          ) 登入
          el-button(
            @click="() => handleLoginState('register')"
            color="#248266"
            type="primary"
          ) 註冊
    el-row
      el-col(:span="24")
        el-menu(
          :default-active="activeIndex"
          class="menu"
          mode="horizontal"
          text-color="#FFF"
          active-text-color="#FFF"
          background-color="transparent"
        )
          el-menu-item(
            v-for="item in menuItem"
            :key="item.key"
            :index="item.key"
          )
            router-link(:to="`/${item.link}`") {{ item.name }}
    el-row.slogan-wrap
      el-col(:span="24")
        p.title 尋找下趟住宿
        p.desc 搜尋飯店、民宿及其他住宿類型的優惠…
.page-content
  router-view
.footer Copyright © Aaron.Chen. All rights reserved.
LoginDialog(:open="dialogState" :type="dialogType" @on-close="handleCloseDialog")
</template>

<!-- <div class="common-layout nav">
  <div class="page-content">
    <el-row>
      <el-col :span="12">
        <div class="left">
          <span class="logo">Aaron.BOOKING</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div v-if="!isLogin" class="right">
          <el-button @click="() => handleLoginState('login')" color="#248266" type="primary">登入</el-button>
          <el-button @click="() => handleLoginState('register')" color="#248266" type="primary">註冊</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="activeIndex"
          class="menu"
          mode="horizontal"
          text-color="#FFF"
          active-text-color="#FFF"
          background-color="transparent"
        >
          <el-menu-item
            v-for="item in menuItem"
            :key="item.key"
            :index="item.key"
          >
            <router-link :to="`/${item.link}`">
              {{ item.name }}
            </router-link>
          </el-menu-item>
        </el-menu>

      </el-col>
    </el-row>
    <el-row class="slogan-wrap">
      <el-col :span="24">
        <p class="title">尋找下趟住宿</p>
        <p class="desc">搜尋飯店、民宿及其他住宿類型的優惠…</p>
      </el-col>
    </el-row>
  </div>
</div>
<div class="page-content">
  <router-view></router-view>
</div>
<div class="footer">
    Copyright © Aaron.Chen. All rights reserved.
</div>

<LoginDialog :open="dialogState" :type="dialogType" @on-close="handleCloseDialog" /> -->

<script lang="ts">
import { ref, defineComponent }  from 'vue';
import LoginDialog from '../Dialog/index.vue';
import { stores } from '../../store/index'
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'indexPage',
  components: {
    LoginDialog,
  },
  setup() {
    const dialogState = ref(false);
    const dialogType = ref('login');
    const activeIndex = ref('1');
    const { isLogin } = storeToRefs(stores.useLoginStore());


    const menuItem = [
      { key: '1', name: '住宿', link: ''},
      { key: '2', name: '航班', link: ''},
      { key: '3', name: '租車', link: ''},
      { key: '4', name: '景點/活動', link: ''},
      { key: '5', name: '機場計程車', link: ''},
    ];

    const handleLoginState = (type: string) => {
      dialogType.value = type;
      dialogState.value = true;
    }

    const handleCloseDialog = () => {
      dialogState.value = false;
    }

    return {
      dialogState,
      dialogType,
      isLogin,
      menuItem,
      activeIndex,
      handleLoginState,
      handleCloseDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu {

  background: transparent;
}

.nav {
  background: #34a47e;
  padding: 15px;

  > div {
    margin-bottom: 15px;
  }
  .right {
    display: flex;
    justify-content: flex-end;
  }
}

.slogan-wrap {
  .title {
    font-size: 45px;
  }
  .desc {
    font-size: 20px;
  }
}

.footer {
  background: #033d28;
  color: #fff;
  padding: 15px;
  text-align: center;
}
</style>