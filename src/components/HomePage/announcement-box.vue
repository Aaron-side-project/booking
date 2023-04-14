<template lang="pug">
.announcement
  el-row(v-if="!useImg")
    Warning(color="#d9363e" :style="{ width: '20px', marginRight: '5px'}")
    | 獲得所需建議。在出發之前，查看最新的新冠肺炎（COVID-19）相關限制。了解更多
  el-row(v-if="useImg")
    el-col(:span="4")
      el-image(:style="{width: '180px'}" :src="dataList?.url" fit="cover")
    el-col(:span="20")
      .title {{ dataList?.title }}
      .desc {{ dataList?.text }}
      slot
</template>

<!-- <div className='announcement'>
  <el-row v-if="!useImg">
  <Warning  color="#d9363e" :style="{ width: '20px', marginRight: '5px'}" />
    獲得所需建議。在出發之前，查看最新的新冠肺炎（COVID-19）相關限制。了解更多
  </el-row>

  <el-row v-if="useImg">
    <el-col :span="4">
      <el-image :style="{width: '180px'}" :src="dataList?.url" fit="cover"/>
    </el-col>
    <el-col :span="20">
      <div class="title"> {{ dataList?.title }} </div>
      <div class="desc"> {{ dataList?.text }} </div>
      <slot></slot>
    </el-col>
  </el-row>
</div> -->

<script lang="ts">
import {
  Warning
} from '@element-plus/icons-vue';
import {
  defineComponent,
  computed,
  type PropType,
} from 'vue';

type dataType = {
  url: string;
  title: string;
  text: string
}

export default defineComponent({
  name: 'announcementBox', //詳細資訊
  components: {
    Warning,
  },
  props: {
    isUseImg: {
      type: Boolean,
    },
    data: {
      type: Object as PropType<dataType>,
    },
  },
  setup(props) {

    const useImg = computed(() => props.isUseImg);
    const dataList = computed(() => props.data);

    return {
      useImg,
      dataList,
    };
  }
});


</script>

<style lang="scss" scoped>
.announcement {
  padding: 15px;
  margin: 20px 0 15px;
  box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;

  .title {
    font-size: 36px;
    font-weight: 700;
    color: #000;
  }

  .desc {
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>