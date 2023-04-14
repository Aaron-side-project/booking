<template lang="pug">
el-row(:gutter="20")
  el-col(:span="7")
    el-affix(:offset="20")
     .search-wrap
       el-text.title(tag="h3") 搜尋
       el-form
        el-form-item
          label 目的地/住宿名稱:
          el-input(v-model="form.city")
        el-form-item
          label 入住時間/退房時間
          el-date-picker(
            size="large"
            v-model="form.date"
            type="daterange"
            range-separator="～"
            start-placeholder="入住時間"
            end-placeholder="退房時間"
          )
        el-form-item
          label 每晚最低價格
          el-input(v-model="form.minPrice")
        el-form-item
          label 每晚最高價格
          el-input(v-model="form.maxPrice")
        el-form-item
          div.select-number(@click="handleShowDialog")
            | {{ form.aldult }} 位成人 · {{ form.child }} 位小孩 · {{ form.room }} 間房
        el-form-item
          el-button.search-btn(
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
  el-col(:span="17")
    RoomsList(:data="roomList")
</template>


<!-- <el-row :gutter="20">
  <el-col :span="7">
    <el-affix :offset="20">
      <div class="search-wrap">
        <el-text class="title" tag="h3">搜尋</el-text>
        <el-form>
          <el-form-item>
            <label>目的地/住宿名稱:</label>
            <el-input v-model="form.city" />
          </el-form-item>
          <el-form-item>
            <label>入住時間/退房時間</label>
            <el-date-picker
              size="large"
              v-model="form.date"
              type="daterange"
              range-separator="～"
              start-placeholder="入住時間"
              end-placeholder="退房時間"
            />
          </el-form-item>
          <el-form-item>
            <label>每晚最低價格</label>
            <el-input v-model="form.minPrice" />
          </el-form-item>
          <el-form-item>
            <label>每晚最高價格</label>
            <el-input v-model="form.maxPrice" />
          </el-form-item>
          <el-form-item>
            <div
              class="select-number"
              @click="handleShowDialog"
            >
              {{ form.aldult }} 位成人 · {{ form.child }} 位小孩 · {{ form.room }} 間房
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              class="search-btn"
              size="large"
              color="#248266"
              type="primary"
              @click="onSubmit"
            >
              搜尋
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-affix>
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
    </el-dialog>

  </el-col>

  <el-col :span="17">
    <RoomsList :data="roomList" />
  </el-col>
</el-row> -->

<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue';
import RoomsList from './RoomsList.vue';
import request from '../../utils/request';
import { stores } from '../../store/index'

export default defineComponent({
  name: 'roomPage',
  components: {
    RoomsList
  },
  setup() {
    const store = stores.useRoomStore();
    const form = ref({ ...store.roomSearch });
    const roomList = ref([]);
    const showDialog = ref(false);

    const handleShowDialog = () => {
      showDialog.value = !showDialog.value;
    }

    const onSubmit = () => {
      getRoomList();

      store.setRoomSearch(form.value);
    }

    const getRoomList = async () => {
      const out = await request('GET', 'api/v1/hotels', {
        ...form.value
      })

      if (out?.result === 'ok') {
        roomList.value = out.ret;
      }
    }

    onMounted(() => {
      getRoomList();
    })

    return {
      form,
      showDialog,
      roomList,
      onSubmit,
      handleShowDialog,
    }
  },
})

</script>

<style lang="scss">
.search-wrap {
  background: #fec488;
  padding: 15px;

  .title {
    font-size: 24px;
    background: #fe9535;
    padding: 5px;
    color: #000;
    font-weight: 700;
  }
}

.search-btn {
  width:100%;
  height: 50px;
}
</style>