<template lang="pug">
el-card(
  class="room-list-wrap"
  v-for="item in dataList"
  :key="item._id"
)
  el-row
    el-col(:span="8")
      el-image(
        style="width: 250px; height: 250px"
        :src="item.photos[0]"
        fit="cover"
      )
    el-col(:span="16")
      el-row.item-info(justify="space-between")
        el-col(:span="16")
          div.title {{ item.title }}
        el-col(:span="8")
          .rate
            div
              span {{ item.rating >= 9.5 ? "好極了" : "傑出" }}
              p {{ item.comments }}則評論
            el-button(style="width: 48px; height: 48px" color="#34a47e" type="primary") {{ item.rating }}
      .infoDes
        span.far {{ item.distance }}
        span
          el-button(color="#34a47e" type="primary") 免費專機接送
        el-row.infoDetail
          el-col.detail-left(:span="12")
            .infoDetail
              .equipment
                p 標準單人房－附共用衛浴
                p 一張單人床
              .detailDes
                p(style="color: #34a47e;fontWeight: 700") 免費取消
                p(style="color: #34a47e") 立即搶下優惠價－可取消
                p(style="color: red") 此價格的客房在本站僅剩 {{ item.rooms.length }} 間
          el-col.detail-right(:span="12")
            p.optionDes(v-if="(night !== 0) && people") {{ night }}晚、{{ people }}位
            p.optionDes(v-if="(night === 0) || !people" style="color: red") 請先選擇入房日期和人數
            p.price TWD {{ item.cheapestPrice }}
            p.tax 含稅費與其他費用
            router-link(
              :to="{ path: `/room/${item._id}` }"
              style="text-decoration: none;"
            )
              el-button.detail-btn(color="#ff8e03" type="primary") 查看客房供應情況

</template>
<!-- <el-card
  class="room-list-wrap"
  v-for="item in dataList"
  :key="item._id"
  >
  <el-row>
    <el-col :span="8">
      <el-image
        style="width: 250px; height: 250px"
        :src="item.photos[0]"
        fit="cover"
        />
    </el-col>
    <el-col :span="16">
      <el-row class="item-info" justify="space-between">
        <el-col :span="16">
          <div class="title">
            {{ item.title }}
          </div>
        </el-col>
        <el-col :span="8">
          <div className="rate">
            <div>
              <span>{{ item.rating >= 9.5 ? "好極了" : "傑出" }}</span>
              <p>{{ item.comments }}則評論</p>
            </div>
            <el-button style="width: 48px; height: 48px" color="#34a47e" type="primary" >{{ item.rating }}</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="infoDes">
        <span className="far">{{ item.distance }}</span>
        <span><el-button color="#34a47e" type="primary" >免費專機接送</el-button></span>
      </div>
      <el-row class="infoDetail">
        <el-col class="detail-left" :span="12">
          <div class="infoDetail">
            <div className="equipment">
              <p>標準單人房－附共用衛浴</p>
              <p>一張單人床</p>
            </div>
            <div className="detailDes">
              <p style="color: #34a47e;fontWeight: 700">免費取消</p>
              <p style="color: #34a47e">立即搶下優惠價－可取消</p>
              <p style="color: red">此價格的客房在本站僅剩 {{ item.rooms.length }} 間</p>
            </div>
          </div>
        </el-col>
        <el-col class="detail-right" :span="12">
          <p className="optionDes">
            五晚、1位
          </p>
          <p className="price">
            TWD {{ item.cheapestPrice }}
          </p>
          <p className="tax">
            含稅費與其他費用
          </p>
          <router-link
            :to="{ path: `/room/${item._id}` }"
            style="text-decoration: none;"
          >
            <el-button class="detail-btn" color="#ff8e03" type="primary">查看客房供應情況</el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</el-card> -->
<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue';
import { stores } from '@/store';

type roomDetailType = {
  _id: string;
  photos: string[];
  title: string;
  rating: number;
  comments: number;
  distance: string;
  rooms:  string[];
  cheapestPrice: number;
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<roomDetailType[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const store = stores.useRoomStore()
    console.log(store.roomSearch);
    const dataList = computed(() => props.data)
    const isDisabled = computed(() => props.disabled)

    const night = computed(() => {
      let num = 0;

      if (store.roomSearch.date?.length) {
        num = (store.roomSearch.date[1] - store.roomSearch.date[0]) / (1000 * 3600 * 24);
      }

      return num;
    })

    const people = computed(() => {
      let  num = 0

      if (store.roomSearch.aldult) {
        num = store.roomSearch.aldult
      }

      return num;
    })

    return {
      dataList,
      isDisabled,
      night,
      people,
    }
  }
})

</script>

<style lang="scss">
.room-list-wrap {
  margin-bottom: 20px;

  .item-info {
    padding-bottom: 15px;

    .title{
      padding: 0 20px 0 0;
      font-size: 18px;
    }

    .rate {
      display: flex;
      justify-content: flex-end;

      > div {
        padding-right: 20px;
        text-align: right;
      }
    }
  }

  .infoDes {
    padding-bottom: 10px;

    .far {
      color: #34a47e;
      border-bottom: 1px solid #34a47e;
      font-size: 12px;
      margin-right: 15px;
    }
  }

  .infoDetail {
    .detail-left {
      .equipment {
        padding-bottom: 15px;

        > p:nth-of-type(1) {
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
  }
}

.detail-right{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;

  .price {
    font-size: 20px;
    font-weight: 500;
  }

  .tax {
    color: gray;
  }
  .detail-btn {
    color: #fff !important;
    font-size: 24px !important;
  }
}
</style>