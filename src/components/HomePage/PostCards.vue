<template lang="pug">
el-row
  el-col.CardContainer(
    v-for="item in dataList.slice(0,2)"
    :span="12"
    :key="item.id"
  )
    el-image.imgBg(:src="item.img" fit="cover")
    .itemInfo
      h3 {{ item.name }}
        el-image(:src="item.flag" fit="cover")
      p {{ item.amount }}

el-row
  el-col.CardContainer(
    v-for="item in dataList.slice(2,5)"
    :span="8"
    :key="item.id"
  )
    el-image(:src="item.img" fit="cover")
    .itemInfo
      h3 {{ item.name }}
        el-image(:src="item.flag" fit="cover")
      p {{ item.amount }}
</template>

<!-- <el-row>
  <el-col
    v-for="item in dataList.slice(0,2)"
    :span="12"
    :key="item.id"
    class="CardContainer"
  >
    <el-image class="imgBg" :src="item.img" fit="cover" />
    <div class="itemInfo">
      <h3>{{ item.name }} <el-image :src="item.flag" fit="cover" /></h3>
      <p>{{ item.amount }}</p>
    </div>
  </el-col>
 </el-row>

 <el-row>
  <el-col
    v-for="item in dataList.slice(2,5)"
    :span="8"
    :key="item.id"
    class="CardContainer"
  >
    <el-image :src="item.img" fit="cover" />
    <div class="itemInfo">
      <h3>{{ item.name }} <el-image :src="item.flag" fit="cover" /></h3>
      <p>{{ item.amount }}</p>
    </div>
  </el-col>
</el-row> -->

<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";
import type { dataType } from './type';

  export default defineComponent({
    props: {
      data: {
        type: Array as PropType<dataType[]>,
        default: () => [],
      }
    },
    setup(props) {
      const dataList = computed(() => props.data);


      return {
        dataList
      }
    },
  })
</script>

<style lang="scss">
.CardContainer {
  padding: 5px;

  .imgBg {
    object-fit: cover;
    width: 100%;
    border-radius: 2px;
  }

  .itemInfo {
    position: absolute;
    top: 12px;
    left: 22px;
    color: white;
    text-shadow: 2px 2px black;

    h3 {
      display: flex;
    }

    .el-image {
      padding-left: 5px;
    }
  }
}
</style>