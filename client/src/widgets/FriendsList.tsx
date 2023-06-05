import { useAppSelector, useAppDispatch } from "../app/store";
import axios from "axios";
import { setFriends } from "../feature/state";
import { useEffect } from "react";

const FriendsList = () => {
  const { token, userProfileData } = useAppSelector((state) => state.users);
  const _id = useAppSelector((state) => state.users.userProfileData?._id);
  const dispatch = useAppDispatch();

  const getFriends = async () => {
    try {
      const { data } = await axios.get(`/users/${_id}/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setFriends({ friends: data }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFriends();
  }, [userProfileData?.friends.length]);

  return (
    <main className=" comps mt-4 flex flex-col w-full rounded-xl p-4">
      <h3 className="font-bold">Friends List</h3>
      {userProfileData?.friends.map((friend) => (
        <section
          key={friend._id}
          className="flex w-full items-center justify-between mt-3"
        >
          <div className="flex sm-gap">
            <img
              src={friend.picturePath}
              alt=""
              className="w-[40px] h-[40px] object-cover rounded-[50%]"
            />

            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {friend.firstName} {friend.lastName}
              </span>
              <small className="text-xs">{friend.bio}</small>
            </div>
          </div>
          <small className="text-primary cursor-pointer hover:bg-slate-100 px-3 rounded-xl">
            Following
          </small>
        </section>
      ))}
    </main>
  );
};

export default FriendsList;
