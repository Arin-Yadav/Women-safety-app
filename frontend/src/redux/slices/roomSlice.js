// roomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoomId: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setCurrentRoomId: (state, action) => {
      state.currentRoomId = action.payload;
    },
    clearRoomId: (state) => {
      state.currentRoomId = null;
    },
  },
});

export const { setCurrentRoomId, clearRoomId } = roomSlice.actions;
export default roomSlice.reducer;
