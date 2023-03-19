import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  bio: String,
  picturePath: String,
  location: String,
  dob: String,
  friends: {
    type: Array,
    default: [],
  },
  joined: Date,
  post: {
    type: Array,
  },
  media: {
    type: Array,
  },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
