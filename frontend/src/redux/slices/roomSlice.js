// roomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: { rooms: [] },
  reducers: {
    setRoom: (state, action) => {
      state.rooms = action.payload; // replace with full array
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload); // add new room
    },
    removeRoom: (state, action) => {
      state.rooms = state.rooms.filter((room) => room._id !== action.payload);
    },
  },
});

export const { setRoom, addRoom, removeRoom } = roomSlice.actions;
export default roomSlice.reducer;
