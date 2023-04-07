import { MdPersonAddAlt, MdOutlineLocationOn } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import person from "../assets/p3.jpeg";
import Twitter from "../assets/twitter.png";
import LinkedIn from "../assets/linkedin.png";
import { useAppSelector, useAppDispatch } from "../app/store";
import { setUserProfile } from "../feature/state";
import axios from "axios";
import { useEffect } from "react";

interface Props {
  userId: string | undefined;
}

const UserProfile = ({ userId }: Props) => {
  const { mode, token, userProfileData } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();

  const checkNumOfFriends = () => {
    let numOfFriends;
    if (userProfileData?.friends) {
      numOfFriends = userProfileData?.friends.length > 1 ? "Friends" : "Friend";
    }

    return numOfFriends;
  };

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3003/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUserProfile(data));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [userId]);

  return (
    <>
      <div
        className={` 
      ${mode === "light" ? "bg-white" : "bg-gray-800"}
      flex flex-col w-full p-4 max-w-[390px] rounded-xl max-h-fit h-full`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex sm-gap">
            <img
              src={person}
              alt=""
              className="w-[50px] h-[50px] object-cover rounded-[50%] "
            />

            <div className="flex flex-col">
              <span className="font-bold">
                {userProfileData?.firstName} {userProfileData?.lastName}
              </span>
              <small>
                {userProfileData?.friends.length} {checkNumOfFriends()}
              </small>
            </div>
          </div>
          <MdPersonAddAlt className="hover:bg-slate-100 rounded-xl cursor-pointer w-6 h-6 p-1" />
        </div>
        <hr className="inline-block w-full my-5" />

        <div className="flex items-center sm-gap">
          <MdOutlineLocationOn />
          <span>📍 {userProfileData?.location}</span>
        </div>
        <div className="flex items-center sm-gap">
          <IoBriefcaseOutline />
          <span>{userProfileData?.bio}</span>
        </div>
        <hr className="inline-block w-full my-5" />
        <div className="flex items-center justify-between">
          <small>Who's viewed your profile</small>
          <small>{userProfileData?.viewedProfile}</small>
        </div>
        <div className="flex items-center justify-between">
          <small>Impressions on your posts</small>
          <small>{userProfileData?.impressions}</small>
        </div>
        <hr className="inline-block w-full my-5" />
        <div>
          <h3 className="font-bold mb-3">Social Profiles</h3>
          <div className="flex items-center sm-gap">
            <img src={Twitter} alt="" />
            <div className="flex flex-col">
              <span className="font-bold">Twitter</span>
              <small>Social Network</small>
            </div>
          </div>
          <div className="flex items-center sm-gap mt-3">
            <img src={LinkedIn} alt="" />
            <div className="flex flex-col">
              <span className="font-bold">LinkedIn</span>
              <small>Networking Platform</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
