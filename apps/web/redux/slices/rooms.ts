import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Key } from "react";

// Define room object type
export interface Room {
  id: string;
  roomName: string;
  ownerId: string;
  createdAt: string;
}

export interface ChatProp {
  text: string;
  id: Key
}

export interface RoomDetail {
  [x: string]: any;
  roomName: string,
  members: string[],
  chats: ChatProp[]

}

export interface RoomState {
  rooms: Room[]; // array of objects
  roomDetail: RoomDetail | null
}

// Initialize as empty array
const initialState: RoomState = {
  rooms: [],
  roomDetail: null
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // Add a single room
    addRoom(state, action: PayloadAction<Room>) {
      state.rooms.push(action.payload);
    },
    // Replace all rooms (e.g., when fetching from API)
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload;
    },
    setRoomDetails(state, action) {
      state.roomDetail = action.payload
    },
    addMsg(state, action) {

      if(
        state.roomDetail && !state.roomDetail.chats.some((chat) => chat.id === action.payload.id)
      ){
        state.roomDetail?.chats.push(action.payload);
      }
    }
  },
});

export const { addRoom, setRooms, setRoomDetails, addMsg } = roomSlice.actions;
export default roomSlice.reducer;
