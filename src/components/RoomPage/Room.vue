<template lang="pug">
el-row.header-btn
  el-col(:span="24")
    el-button(
      v-for=" item in tag"
      :key="item.key"
      color="#248266"
      type="primary"
    ) {{ item.name }}

el-row.header-title
  el-col(:span="12")
    .title-wrap
      span.type {{ roomData.type }}
      span.name {{ roomData.name }}
      span.recommend
        span.recommendSvg
          UserFilled(color="#248266")
        | 推薦四人住宿
    .address
      LocationFilled(:style="{width: '20px', marginRight: '5px'}" color="#e53f3f")
      | {{ roomData.address }}
      a 地理位置超棒－顯示地圖
  el-col.title-wrap-2(:span="12")
    el-button(
      color="#248266"
      type="primary"
      @click="handleRoomsModal"
    ) 現在就預訂
    p
      Bell(:style="{width: '20px', marginRight: '1px'}" color="#e53f3f")
      span 買貴退差價

el-row
  el-col
   .hotelImgWrapper(@mouseover="mouseover" @mouseleave="mouseleave")
    .hotelImg
      .Imgwrap(
        v-for="(item, index) in (roomData.photos || []).slice(0, 6)"
        :key="item"
      )
        .more(
          v-if="index >= 5"
          @click="openPhotoView"
        ) +{{ (roomData.photos || []).length - 6 }}張圖片
        img(:src="item" alt="img")
    .rate(v-if="showRate")
      el-button(
        style="width: 48px; height: 48px" color="#34a47e"
        type="primary"
      ) {{ roomData.rating }}
      div
        span {{ (roomData?.rating || 0) >= 9.5 ? "好極了" : "傑出" }}
        p {{ roomData.comments }} 則評論

el-row.hotelDes(:gutter="20")
  el-col(:span="18") {{ roomData.desc }}
    h1 熱門設施
    hr
    p.textIcon
      SwitchFilled(:style="{width: '20px', marginRight: '5px'}")
      | 免費無線網路
      CircleCloseFilled(color="#e53f3f" :style="{width: '20px', marginRight: '5px',marginLeft: '5px'}")
      | 禁菸客房
  el-col.hotelDesPrice(:span="6")
    div
      h2 住宿特色
      p 入住 {{ night }} 晚的最佳選擇！此住宿位於{{ roomData.city }}評分最高的地區，地理位置評分高達9.3分深受獨行旅客歡迎
      h2 TWD {{ roomData.cheapestPrice }}
      el-button(
        color="#248266"
        type="primary"
        style="width: 100%; height: 50px;"
        @click="handleRoomsModal"
      ) 現在就預訂

el-dialog(v-model="photoModal" :show-close="false")
  el-carousel(
    indicator-position="outside"
    height="500px"
    autoplay="false"
  )
    el-carousel-item(
      v-for="item in roomData.photos"
      :key="item"
    )
      el-image(
        :src="item"
        style="width: 100%; height: 500px" fit="cover"
      )

el-dialog.room-dialog(
  v-model="showRoomsModal"
  :show-close="false"
  title="空房情況"
  @close="handleCloseModal"
)
    el-table(:data="roomList" style="width: 100%" border)
      el-table-column(prop="title" label="房型")
      el-table-column(prop="desc" label="描述")
      el-table-column(prop="price" label="價格")
      el-table-column(prop="roomNumbers" label="房號")
        template(#default="scope")
          el-checkbox-group(v-model="checkedRoom")
            el-checkbox(
              v-for="item in scope.row.roomNumbers"
              :key="item._id"
              :label="item._id"
            ) {{ item.number }}
    .book-button
      el-button(
        color="#248266"
        type="primary"
        @click="submitBooking"
      ) 預約
</template>

<!-- <el-row class="header-btn">
  <el-col :span="24">
    <el-button
      v-for=" item in tag"
      :key="item.key"
      color="#248266"
      type="primary"
    >
      {{ item.name }}
    </el-button>
  </el-col>
</el-row>

<el-row class="header-title">
  <el-col :span="12">
    <div class="title-wrap">
      <span class="type">{{ roomData.type }}</span>
      <span class="name">{{ roomData.name }}</span>
      <span class='recommend'>
        <span class="recommendSvg">
          <UserFilled color="#248266" />
        </span>
        推薦四人住宿
      </span>
    </div>
    <div className="address">
      <LocationFilled :style="{width: '20px', marginRight: '5px'}" color="#e53f3f" />
      {{ roomData.address }}
      <a>地理位置超棒－顯示地圖</a>
    </div>
  </el-col>
  <el-col :span="12" class="title-wrap-2">
    <el-button
      color="#248266"
      type="primary"
      @click="handleRoomsModal"
    >
      現在就預訂
    </el-button>
    <p><Bell :style="{width: '20px', marginRight: '1px'}" color="#e53f3f" /><span>買貴退差價</span></p>
  </el-col>
</el-row>

<el-row>
  <el-col>
    <div
      className="hotelImgWrapper"
      @mouseover="mouseover"
      @mouseleave="mouseleave"
    >
      <div className="hotelImg">
        <div className="Imgwrap"
          v-for="(item, index) in (roomData.photos || []).slice(0, 6)"
          :key="item"
        >
          <div
            v-if="index >= 5"
            className="more"
            @click="openPhotoView"
          >
            +{{ (roomData.photos || []).length - 6 }}張圖片
          </div>
          <img :src="item" alt="img" />
        </div>
      </div>
      <div class="rate" v-if="showRate">
        <el-button style="width: 48px; height: 48px" color="#34a47e" type="primary" >{{ roomData.rating }}</el-button>
        <div>
          <span>{{ (roomData?.rating || 0) >= 9.5 ? "好極了" : "傑出" }}</span>
          <p>{{ roomData.comments }} 則評論</p>
        </div>
      </div>
    </div>
  </el-col>
</el-row>

<el-row class="hotelDes" :gutter="20">
  <el-col :span="18">
    {{ roomData.desc }}
    <h1>熱門設施</h1>
    <hr />
    <p className='textIcon'>
      <SwitchFilled :style="{width: '20px', marginRight: '5px'}" />免費無線網路
      <CircleCloseFilled color="#e53f3f" :style="{width: '20px', marginRight: '5px',marginLeft: '5px'}" />禁菸客房
    </p>
  </el-col>

  <el-col :span="6" class="hotelDesPrice">
    <div>
      <h2>住宿特色</h2>
      <p>入住 5 晚的最佳選擇！
        此住宿位於{{ roomData.city }}評分最高的地區，地理位置評分高達 9.3 分
        深受獨行旅客歡迎</p>
      <h2>TWD {{ roomData.cheapestPrice }}</h2>
      <el-button
        color="#248266"
        type="primary"
        style="width: 100%; height: 50px;"
        @click="handleRoomsModal"
      >
        現在就預訂
      </el-button>
    </div>
  </el-col>
</el-row>

<el-dialog v-model="photoModal" :show-close="false">
  <el-carousel
    indicator-position="outside"
    height="500px"
    autoplay="false"
  >
    <el-carousel-item
      v-for="item in roomData.photos"
      :key="item"
    >
      <el-image
        :src="item"
        style="width: 100%; height: 500px" fit="cover"
      />
    </el-carousel-item>
  </el-carousel>
</el-dialog>

<el-dialog v-model="showRoomsModal" :show-close="false"  title="空房情況">
  <el-table :data="roomList" style="width: 100%">
    <el-table-column prop="title" label="房型" />
    <el-table-column prop="desc" label="描述" />
    <el-table-column prop="price" label="價格" />
    <el-table-column prop="roomNumbers" label="房號">
      <template #default="scope">
        <p
          v-for=" item in scope.row.roomNumbers"
          :key="item._id"
        >
          {{ item.number }}
        </p>
      </template>
    </el-table-column>
  </el-table>
</el-dialog> -->



<script lang="ts">
import { onMounted, ref, defineComponent, computed } from 'vue';
import {
  Bell,
  UserFilled,
  LocationFilled,
  SwitchFilled,
  CircleCloseFilled,
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import request from '../../utils/request';
import { stores } from '@/store';


type roomDetailType = {
  _id?: string;
  name?: string;
  address?: string;
  photos?: string[];
  rating?: number;
  comments?: string;
  desc?: string;
  city?: string;
  type?: string;
  cheapestPrice?: number;
}

export default defineComponent({
  name: 'roomDetail',
  components: {
    Bell,
    UserFilled,
    LocationFilled,
    SwitchFilled,
    CircleCloseFilled,
  },
  setup() {
    const store = stores.useRoomStore()
    const route = useRoute();
    const tag = [
      { key: 0, name: '資訊 & 房價' },
      { key: 1, name: '設施' },
      { key: 2, name: '訂房須知' },
      { key: 3, name: '房客評價' },
    ]

    const roomData = ref<roomDetailType>({});
    const roomList = ref([]);
    const photoModal = ref(false);
    const showRate = ref(false);
    const showRoomsModal = ref(false);
    const checkedRoom = ref([]);

    const night = computed(() => {
      let num = 0;

      if (store.roomSearch.date?.length) {
        num = (store.roomSearch.date[1] - store.roomSearch.date[0]) / (1000 * 3600 * 24);
      }

      return num;
    })

    const openPhotoView = () => {
      photoModal.value = !photoModal.value;
    }

    const handleRoomsModal = () => {
      showRoomsModal.value = !showRoomsModal.value;
    }

    const handleCloseModal = () => {
      checkedRoom.value = [];
    }

    const getRoomData = async () => {
      const id = route.params.roomId
      const out = await request('GET', `/api/v1/hotels/find/${id}`);

      if (out?.result === 'ok') {
        roomData.value = out.ret;
      }
    };

    const getRoomList = async () => {
      const id = route.params.roomId
      const out = await request('GET', `/api/v1/room/findHotel/${id}`);

      if (out?.result === 'ok') {
        roomList.value = out.ret;
      }
    };

    const submitBooking = async () => {
      // const id = route.params.roomId
      // const out = await request('GET', `/api/v1/hotels/find/${id}`);

      // if (out?.result === 'ok') {
      //   roomData.value = out.ret;
      // }

      console.log(checkedRoom.value);
    };

    const mouseover = () => {
      showRate.value = true;
    }

    const mouseleave = () => {
      showRate.value = false;
    }

    onMounted(() => {
      getRoomData();
      getRoomList();
    })


    return {
      tag,
      roomData,
      photoModal,
      showRate,
      roomList,
      openPhotoView,
      mouseover,
      mouseleave,
      handleRoomsModal,
      showRoomsModal,
      checkedRoom,
      handleCloseModal,
      submitBooking,
      night,
    }
  },

});


</script>

<style lang="scss">
.recommend {
  vertical-align: bottom;
  background-color: #cbe5d8;
  font-size: 12px;
  border-radius: 15px;
  padding: 3px 10px 3px 0;
  display: inline-flex;
  margin-left: 5px;

  .recommendSvg {
    display: inline-flex;
    align-items: center;
    margin-right: 3px;

    > svg {
      width: 20px;
      background-color: #fff;
      border: 1px solid black;
      border-radius: 50%;
    }
  }

}

.header-title {
  margin: 25px 0 15px;
}

.title-wrap {
  display: flex;
  align-items: center;

  .type {
    color: white;
    background-color: #00d8ff;
    border-radius: 2px;
    padding: 2px;
    margin-right: 5px;
  }

  .name {
    font-size: 20px;
    font-weight: 600;
  }
}

.address {
  display: flex;

  a {
    padding-left: 5px;
    color: #00d8ff;
  }
}

.title-wrap-2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > p {
    display: flex;
    font-weight: 700;
  }
}




/* photo */
.hotelImgWrapper {
  position: relative;

  .hotelImg {
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3px;

    .Imgwrap:first-child {
      grid-column: 1/3;
      grid-row: 1/3;
    }

    .Imgwrap {
      position: relative;
      border-radius: 2px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }

    .more {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      z-index: 99;
      cursor: pointer;
    }
  }

  .rate {
    display: flex;
    width: 250px;
    background: #fff;
    padding: 5px;
    border-radius: 10px;
    position: absolute;
    top: 20px;
    left: 20px;

    > div {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
  }
}

.hotelDes {
  padding: 15px 0;
}

.hotelDesPrice {
  > div {
    background-color: rgba(53, 164, 127, 0.5);
    padding: 15px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }

  h2 {
    font-weight: 700;
  }
}

.textIcon {
  display: flex;
}

.room-dialog {
  .el-dialog__body {
    display: grid;
    grid-template-areas: "table button";
  }

  .book-button {
    padding: 0 0 0 5px;

    button {
      height: 100%;
    }
  }
}
</style>