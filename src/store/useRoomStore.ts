import { defineStore } from 'pinia'


export type RoomState = {
  roomId: string;
  roomSearch: RoomSearchState;
};

export type RoomSearchState = {
  city?: string;
  date?: number[];
  minPrice?: string;
  maxPrice?: string;
  aldult?: number;
  child?: number;
  room?: number;
}


export const useRoomStore = defineStore('room', {
  state: (): RoomState => ({
    roomId: '',
    roomSearch: {
      city: '台北',
      date: [],
      minPrice: '',
      maxPrice: '',
      aldult: 0,
      child: 0,
      room: 0,
    },
  }),
  getters: {

  },
  actions: {
    setRoomId(id: string) {
      this.roomId = id;
    },
    setRoomSearch(data = {}) {
      this.roomSearch = {
        ...this.roomSearch,
        ...data,
      };
    },
  }
})

export default useRoomStore;

