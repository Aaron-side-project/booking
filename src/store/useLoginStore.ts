import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Cookies from 'js-cookie';

export const loginStore = defineStore('login', {
  state: () => ({
    isLogin: false,
    username: '',
  }),
  // getters:{
  //   computedIsLogin(state) {
  //     state.isLogin = Cookies.get('isLogin') || false;
  //   }
  // },
  actions: {
    setLogin(login: boolean) {
      console.log(login)
      this.isLogin = login;
    },
  }
})

// const useStore = defineStore('x', () => {
//   const count = ref(0);

//   const d2 = computed((state) => {
//     return count.value * 2
//   })



//   const addCount = () => {
//     count.value++;
//   };

//   return {
//     count,
//     d2,
//     addCount,
//   }
// })

export default loginStore;
