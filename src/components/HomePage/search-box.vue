<template lang="pug">
.search-form-wrap
  el-form.search-form(:inline="true")
    el-form-item
      el-input(size="large" v-model="form.city" placeholder="想去哪～")
    el-form-item
      el-date-picker(
        size="large"
        v-model="form.date"
        type="daterange"
        range-separator="～"
        start-placeholder="出發日期"
        end-placeholder="回程日期"
      )
    el-form-item
      .select-number(@click="handleShowDialog")
        | {{ form.aldult }}位成人 · {{ form.child }} 位小孩 ·{{ form.room }} 間房
    el-form-item
      router-link(to="/room")
        el-button(
          size="large"
          color="#248266"
          type="primary"
          @click="onSubmit"
        ) 搜尋
el-dialog(
  v-model="showDialog"
  size="small"
  width="20%"
  :show-close="false"
  title="填寫人數"
)
  el-form
    el-form-item(label="成人")
      el-input-number(style="width: 100%;" :min="0" v-model="form.aldult" :step="1")
    el-form-item(label="小孩")
      el-input-number(style="width: 100%;" :min="0" v-model="form.child" :step="1")
    el-form-item(label="房間")
      el-input-number(style="width: 100%;" :min="0" v-model="form.room" :step="1")
</template>
<!-- <div class="search-form-wrap">
  <el-form :inline="true"  class="search-form">
    <el-form-item>
      <el-input size="large" v-model="form.city" placeholder="想去哪～" />
    </el-form-item>
    <el-form-item>
      <el-date-picker
        size="large"
        v-model="form.date"
        type="daterange"
        range-separator="～"
        start-placeholder="出發日期"
        end-placeholder="回程日期"
      />
    </el-form-item>
    <el-form-item>
      <div
        class="select-number"
        @click="handleShowDialog"
      >
        {{ form.aldult }}位成人 · {{ form.child }} 位小孩 ·{{ form.room }} 間房
      </div>
    </el-form-item>
    <el-form-item>
      <router-link to="/room">
        <el-button
          size="large"
          color="#248266"
          type="primary"
          @click="onSubmit"
        >
          搜尋
        </el-button>
      </router-link>
    </el-form-item>
  </el-form>
</div>
<el-dialog
  v-model="showDialog"
  size="small"
  width="20%"
  :show-close="false"
  title="填寫人數"
>
  <el-form>
    <el-form-item label="成人">
      <el-input-number style="width: 100%;" :min="0" v-model="form.aldult" :step="1" />
    </el-form-item>
    <el-form-item label="小孩">
      <el-input-number style="width: 100%;" :min="0" v-model="form.child" :step="1" />
    </el-form-item>
    <el-form-item label="房間">
      <el-input-number style="width: 100%;" :min="0" v-model="form.room" :step="1" />
    </el-form-item>
  </el-form>
</el-dialog> -->
<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { stores } from '../../store/index'

  export default defineComponent({
    setup() {
      const store = stores.useRoomStore();
      const initForm = {
        city: '台北',
        date: '',
        aldult: 0,
        child: 0,
        room: 0,
      }
      const form = ref({ ...initForm });
      const showDialog = ref(false);

      const onSubmit = () => {
        store.setRoomSearch(form.value);
      }

      const  handleShowDialog = () => {
        showDialog.value = !showDialog.value;
      }

      return {
        form,
        showDialog,
        onSubmit,
        handleShowDialog,
      }
    },
  });



</script>





<style lang="scss">

.search-form {
  margin: -65px 0 0;
  width: 100%;
  display: flex;

  > div {
    margin: 0 !important;
    flex: 0 1 33%;
  }

  > div:last-child {
    margin: 0;
    flex: 0 1 5%;
  }

  .el-input .el-input__wrapper,
  .select-number {
    width: 100%;
    background: #fff;
  }
}

.select-number {
  width: 100%;
  background: #fff;
  color: #000;
  padding: 4px 10px;
  box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
}

</style>