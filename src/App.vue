<template>
  <HomePage />
</template>

<script setup>
import HomePage from './components/home/index.vue'
import { onMounted }  from 'vue';
import { storeToRefs } from 'pinia';
import Cookies from 'js-cookie';
import { stores } from './store/index'


onMounted(() => {
  const store = stores.useLoginStore();

  console.log('app login', Cookies.get('isLogin'));

  store.setLogin(Cookies.get('isLogin'));
})

</script>

<style>

</style>