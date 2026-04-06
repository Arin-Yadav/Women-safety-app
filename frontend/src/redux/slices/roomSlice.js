// roomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: { rooms: [], currentRoomId: null },
  reducers: {
    setRoom: (state, action) => {
      state.rooms = action.payload; // replace with full array
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload); // add new room
    },
    setCurrentRoomId: (state, action) => {
      state.currentRoomId = action.payload;
    },
  },
});

export const { setRoom, addRoom, setCurrentRoomId } = roomSlice.actions;
export default roomSlice.reducer;
