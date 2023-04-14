<template lang="pug">
el-row.popularHotels(:gutter="20")
  el-col(
    v-for="item in dataList"
    :span="6"
    :key="item._id"
    class="item"
  )
    router-link(
      :to="{ path: `/room/${item._id}` }"
      style="text-decoration: none;"
    )
      el-image(:src="item.photos[0]" fit="cover")
      .itemInfo
        .title {{ item.name }}
        .subTitle {{ item.city }}
        .price TWD {{ item.cheapestPrice }} 起
        .rate
          el-button(color="#34a47e" type="primary")  {{ item.rating }}
          span {{ item.rating >= 9.5 ? "好極了" : "傑出" }}
          p {{ item.comments }}則評論
</template>
<!-- <el-row :gutter="20" class="popularHotels">
  <el-col
    v-for="item in dataList"
    :span="6"
    :key="item._id"
    class="item"
  >
    <router-link
      :to="{ path: `/room/${item._id}` }"
      style="text-decoration: none;"
    >
      <el-image :src="item.photos[0]" fit="cover" />
      <div class="itemInfo">
        <div class="title">{{ item.name }}</div>
        <div className="subTitle">
          {{ item.city }}
        </div>
        <div className="price">
          TWD {{ item.cheapestPrice }} 起
        </div>
        <div className="rate">
          <el-button color="#34a47e" type="primary" >{{ item.rating }}</el-button>
          <span>{{ item.rating >= 9.5 ? "好極了" : "傑出" }}</span>
          <p>{{ item.comments }}則評論</p>
        </div>
      </div>
    </router-link>
  </el-col>
</el-row> -->
<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue';

type dataType = {
  _id: string,
  name: string,
  city: string,
  cheapestPrice: number,
  rating: number,
  photos: Array<string>,
  comments: number,
}

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
      dataList,
    };
  }
});
</script>

<style lang="scss">
.popularHotels {
  .item {
    margin-bottom: 20px;

    img {
      display: flex;
      width: 250px;
      height: 230px;
    }

    .itemInfo {
      .title {
        color: #000;
      }

      .subTitle {
        color: gray;
        font-size: 12px;
      }

      .price {
        color: black;
        font-weight: 500;
        padding: 2px 0px;
      }

      .rate {
        align-items: center;
        display: flex;
        gap: 5px;

        > span {
          color: black;
        }

        p {
          font-size: 12px;
          color: gray;
        }
      }
    }
  }
}
</style>