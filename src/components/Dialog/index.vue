<template lang="pug">
el-dialog(
  :title="typeState === 'login' ? '登入': '註冊'"
  :model-value="openState"
  @close="closeDialog"
  width="25%"
)
  el-form
    el-form-item(label="帳號")
      el-input(v-model="form.username")
    el-form-item(
      v-if="typeState !== 'login'"
      label="信箱"
      prop="email"
    )
      el-input(type="email" v-model="form.email")
    el-form-item(label="密碼")
      el-input(type="password" v-model="form.password")
    el-form-item
      el-button(
        color="#248266"
        type="primary"
        @click="handleSubmit"
      ) {{ typeState === 'login' ? '登入': '註冊' }}
    el-form-item(v-if="errorMessage")
      div(style="color: red") {{ errorMessage }}
</template>
<!-- <el-dialog
:title="typeState === 'login' ? '登入': '註冊'"
:model-value="openState"
@close="closeDialog"
width="25%"
>
<el-form>
  <el-form-item label="帳號">
    <el-input v-model="form.username" />
  </el-form-item>
  <el-form-item
    v-if="typeState !== 'login'"
    label="信箱"
    prop="email"
  >
    <el-input type="email" v-model="form.email" />
  </el-form-item>
  <el-form-item label="密碼">
    <el-input type="password" v-model="form.password" />
  </el-form-item>

  <el-form-item>
    <el-button
      color="#248266"
      type="primary"
      @click="handleSubmit"
    >
      {{ typeState === 'login' ? '登入': '註冊' }}
    </el-button>
  </el-form-item>

  <el-form-item v-if="errorMessage">
    <div style="color: red">{{ errorMessage }}</div>
  </el-form-item>
</el-form>
</el-dialog> -->
<script lang="ts">
import { ref, defineComponent, computed } from 'vue';
import request from '../../utils/request';
import { stores } from '../../store/index'

export default defineComponent({
  name: 'loginDialog',
  props: {
    open: {
      type: Boolean,
      default: false,
      required:true,
    },
    type: String
  },
  emits: ['on-close'],
  setup(props, { emit }) {
    const store = stores.useLoginStore();

    const initForm = {
      username: '',
      email: '',
      password: '',
    }

    const form = ref({ ...initForm });
    const errorMessage = ref('');

    console.log(props.open);

    const openState = computed(() => props.open);
    const typeState = computed(() => props.type);
    const handleSubmit = async () => {
      errorMessage.value = '';

      if (!form.value.username && !form.value.password) {
        return;
      }

      if (props.type === 'register' && !form.value.email) {
        return;
      }

      const out = await request('POST', `api/v1/${props.type}`, {
        ...form.value,
      })

      if (out?.result === 'ok') {
        form.value = { ...initForm };
        store.setLogin(true);

        closeDialog();
      }

      if (out?.result === 'error') {
        errorMessage.value = out.msg;
      }
    }

    const closeDialog = () => {
      errorMessage.value = '';
      form.value = { ...initForm };

      console.log(initForm);
      emit('on-close');
    }

    return {
      form,
      props,
      openState,
      typeState,
      errorMessage,
      handleSubmit,
      closeDialog,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>