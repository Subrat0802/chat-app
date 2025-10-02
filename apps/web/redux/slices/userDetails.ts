import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Key } from "react";

export interface UserState {
  [x: string]: any;
  id: Key | null;
  userName: string;
  email: string;
}

const initialState: UserState = {
  id: null,
  userName: "",
  email: "",
};

const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    // Replace the entire state with new user details
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },

    // Clear user details
    clearUserDetails: () => initialState,
  },
});

// Export actions and reducer
export const { setUserDetails, clearUserDetails } = userDetails.actions;
export default userDetails.reducer;
