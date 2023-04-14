<template lang="pug">
el-row(
  v-loading="loading"
  :gutter="20"
  :style="{ flexWrap: 'inherit', overflow: 'hidden' }"
)
  el-col(
    :span="4"
    v-for="(item, index) in dataList"
    :key="item.id"
  )
    .item
      el-image(style="width: 200px; height: 150px" :src="item.img" fit="cover")
      .item-info
        .title {{ item.name }}
        .desc {{ totalList[index] }}
          | {{ modeState === 'city' ? ' 間住宿' : `間${item.name}`  }}
</template>

<!-- <el-row v-loading="loading" :gutter="20" :style="{ flexWrap: 'inherit', overflow: 'hidden' }">
  <el-col
    :span="4"
    v-for="(item, index) in dataList"
    :key="item.id"
  >
    <div class="item">
      <el-image style="width: 200px; height: 150px" :src="item.img" fit="cover" />
      <div class="item-info">
        <div class="title">
          {{ item.name }}
        </div>
        <div class="desc">
          {{ totalList[index] }}
          {{ modeState === 'city' ? ' 間住宿' : `間${item.name}`  }}
        </div>
      </div>

    </div>
  </el-col>
</el-row> -->

<script lang="ts">
import request from "../../utils/request"
import type { dataType } from "./type";
import {
  ref,
  onMounted,
  computed,
  defineComponent,
  type PropType,
} from "vue"

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<dataType[]>,
      default: () => [],
    },
    mode: String,
  },
  setup(props) {
    const totalList = ref([]);
    const loading = ref(true);
    const dataList = computed(() => props.data);
    const modeState = computed(() => props.mode);


    const getNumList = async () => {
      let type = 'amountoftype';

      if (props.mode === 'city') {
        type = 'amountofcities';
      }

      const out = await request('GET', `/api/v1/hotels/${type}`, {
        type: props.data.map((item: dataType) => item.name),
      });

      if (out?.result === 'ok') {
        totalList.value = out.ret;
        loading.value = false;
      }
    }

    onMounted(() => {
      getNumList();
    })

    return {
      modeState,
      dataList,
      totalList,
      loading,
    }
  }
});
</script>

<style lang="scss" scoped>
.item-info {
  padding: 5px 0;

  .title {
    font-weight: 700;
    color:#000;
  }

  .desc {
    color: gray;
  }
}
</style>