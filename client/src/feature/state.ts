import { createSlice } from "@reduxjs/toolkit";

interface Post {
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  userPicturePath: string;
  description: string;
  picturePath: string;
  likes: null;
  comments: null;
}

interface UserState {
  mode: string;
  user: string | null;
  token: string | null;
  isRegistered: boolean;
  posts: Post[];
}

const initialState: UserState = {
  mode: "light",
  user: null,
  token: null,
  isRegistered: true,
  posts: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setIsRegistered: (state) => {
      state.isRegistered = !state.isRegistered;
    },
    isLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setIsRegistered, isLoggedIn } = UserSlice.actions;
export default UserSlice.reducer;
