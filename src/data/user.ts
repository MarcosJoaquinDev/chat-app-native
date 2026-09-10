import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  username: string | null;
  email: string | null;
}

const initialState: UserData = {
  id: "",
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },

    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setId, setUsername, setEmail } = userSlice.actions;

export default userSlice.reducer;
