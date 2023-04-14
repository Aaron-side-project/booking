import { createRouter,  createWebHashHistory } from 'vue-router';
import Home from '../components/HomePage/index.vue';
import RoomPage from '../components/RoomPage/page.vue';
import Room from '../components/RoomPage/Room.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/room/', component: RoomPage },
  { path: '/room/:roomId', component: Room },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router;
