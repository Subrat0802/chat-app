import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define room object type
interface Room {
  id: string;
  roomName: string;
  ownerId: string;
  createdAt: string;
}

interface RoomState {
  rooms: Room[]; // array of objects
}

// Initialize as empty array
const initialState: RoomState = {
  rooms: [],
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
  },
});

export const { addRoom, setRooms } = roomSlice.actions;
export default roomSlice.reducer;
