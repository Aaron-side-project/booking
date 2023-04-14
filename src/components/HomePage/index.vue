<template>
  <search-box />
  <announcement-box />
  <announcement-box :isUseImg="true" :data="announcementData[0]">
      <el-button color="#34a47e" type="primary">逛逛優惠</el-button>
  </announcement-box>
  <div class="feature">
    <div class="listItems">
      <p :style="{ color: '#000', fontSize: '24px', fontWeight: 700 }">依住宿類型瀏覽</p>
      <Categories :data="CategoriesType" mode="type" />
    </div>
    <div class="listItems">
      <PostCards :data="Attractions" />
    </div>
    <div class="listItems">
      <div className="listTitle">
        <h3 :style="{ color: '#000', fontWeight: 700 }">探索臺灣</h3>
        <p :style="{ color: '#000' }">這些熱門目的地魅力無窮，等你來體驗！</p>
        <Categories :data="CategoriesCities" mode="city" />
      </div>
    </div>
    <div class="listItems">
      <p :style="{ color: '#000', fontSize: '28px', fontWeight: 700 }">人氣民宿、公寓類型住宿</p>
      <PopularHotels :data="popularHotelList" />
    </div>
  </div>
  <announcement-box :isUseImg="true" :data="announcementData[1]">
    <el-button color="#34a47e">登入</el-button>
    <el-button color="#34a47e">註冊</el-button>
  </announcement-box>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent }  from 'vue';
import SearchBox from './search-box.vue';
import { CategoriesType, CategoriesCities, Attractions, PopularHotelsData } from './data';
import Categories from './categories-box.vue'
import PostCards from './PostCards.vue'
import PopularHotels from './PopularHotels.vue'
import announcementBox from './announcement-box.vue';
import request from '../../utils/request';

export default defineComponent({
  name: 'homePage',
  components: {
    SearchBox,
    Categories,
    PostCards,
    PopularHotels,
    announcementBox,
  },
  setup() {
    const popularHotelList = ref([]);
    const announcementData = [
      {
        url:'https://r-xx.bstatic.com/data/mm/index_banner_getaway22_summer_2.jpg',
        title: '省 15% 或更多',
        text: '這個夏天，讓夢想之旅成真！2022 年 9 月 30 日前預訂並住房就可省一筆，還有跟著參賽完成第一個動態網站為自己開創新事業',
      },
      {
        url:'https://cf.bstatic.com/static/img/genius-globe-with-badge_desktop@2x/1f5a273d871549f00bf6692f7ff612b5e8eda038.png',
        title: '優惠立即享',
        text: '登入您的 Booking.com 帳戶，尋找藍色的 Genius 圖標，輕鬆省一筆',
      }
    ]

    const getPopularHotelList = async () => {
      const out = await request('GET', '/api/v1/hotels', {
        popularHotel: true,
      });

      if (out?.result === 'ok') {
        popularHotelList.value = out.ret;
      }
    };

    onMounted(() => {
      getPopularHotelList();
    });

    return {
      popularHotelList,
      announcementData,
      CategoriesType,
      CategoriesCities,
      Attractions,
      PopularHotelsData,
    };
  }
})

</script>

<style lang="scss" scoped>
.feature {
  padding-top: 20px;
}

.listItems {
  margin-bottom: 15px;
}


</style>