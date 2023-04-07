import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  _id: string;
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

export interface Friends {
  _id: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  bio: string;
}

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  bio: string;
  picturePath: string;
  location: string;
  dob: string;
  friends: Friends[];
  viewedProfile: number;
  impressions: number;
}

interface UserState {
  mode: string;
  uName: string | null;
  token: string | null;
  isRegistered: boolean;
  posts: Post[];
  post: Post | null;
  userProfileData: UserProfile | null;
  isLiked: boolean;
}

const info = localStorage.getItem("user");
const userData = info !== null ? JSON.parse(info) : "";

// const bg = localStorage.getItem("mode")
// const bgColor = bg !== null ? JSON.parse(bg) : ""

const initialState: UserState = {
  mode: "light",
  uName: userData.userFirstName,
  token: userData.token,
  isRegistered: true,
  posts: [],
  post: null,
  userProfileData: userData.user,
  isLiked: false,
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
      state.token = action.payload.token;
      state.uName = action.payload.userFirstName;
      state.userProfileData = action.payload.user;
    },
    setPost: (state, action) => {
      state.posts = [...action.payload];
    },
    setSinglePost: (state, action) => {
      state.post = action.payload;
    },
    setFeeds: (state, action) => {
      state.posts = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfileData = action.payload;
    },
    setFriends: (state, action) => {
      if (state.userProfileData) {
        state.userProfileData.friends = action.payload.friends;
      } else {
        console.log("User friend does not exist");
      }
    },
    setUpdatedPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPost;
      state.isLiked = !state.isLiked;
    },
    isLoggedOut: (state) => {
      state.token = null;
      state.uName = null;
      state.posts = [];
      state.userProfileData = null;
    },
  },
});

export const {
  setMode,
  setIsRegistered,
  isLoggedIn,
  setPost,
  setFeeds,
  setUserProfile,
  setSinglePost,
  setFriends,
  setUpdatedPost,
  isLoggedOut,
} = UserSlice.actions;
export default UserSlice.reducer;
