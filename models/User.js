import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    friends: {
      type: Array,
      default: [],
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
    bio: String,
    viewedProfile: Number,
    impressions: Number,
    dob: {
      type: Date,
      default: 1990 - 3 - 17,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
