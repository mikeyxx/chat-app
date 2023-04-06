import { BiHeart, BiComment } from "react-icons/bi";
import { MdOutlineShare } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "../app/store";
import Person from "../assets/p3.jpeg";
import Eat from "../assets/post1.jpeg";
import { useNavigate } from "react-router-dom";
import { Post, setSinglePost } from "../feature/state";
import axios from "axios";
import { setFriends } from "../feature/state";

const Posts = () => {
  const { mode, posts, token } = useAppSelector((state) => state.users);
  const _id = useAppSelector((state) => state.users.userProfileData?._id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSelectedFriend = (userId: string, item: Post) => {
    dispatch(setSinglePost(item));
    navigate(`/${userId}/post`);
  };

  const addOrRemoveNewFriends = async (friendId: string) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3003/users/${_id}/${friendId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setFriends(data));
    } catch (error: any) {
      console.log("Add friend: " + error.message);
    }
  };

  return (
    <>
      {posts.map((post) => (
        <div
          key={post._id}
          className={`
    ${mode === "light" ? "bg-white" : "bg-gray-800"}
    mt-4 flex flex-col w-full rounded-xl p-4`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex sm-gap">
              <img
                src={Person}
                alt=""
                className="w-[50px] h-[50px] object-cover rounded-[50%] "
              />

              <div className="flex flex-col">
                <span
                  onClick={() => handleSelectedFriend(post.userId, post)}
                  className="font-bold cursor-pointer hover:text-gray-500"
                >
                  {post.firstName} {post.lastName}
                </span>

                <small>{post?.location}</small>
              </div>
            </div>
            <small
              onClick={() => addOrRemoveNewFriends(post.userId)}
              className="text-primary cursor-pointer hover:bg-slate-100 px-3 rounded-xl"
            >
              Follow
            </small>
          </div>
          <p className="my-4">{post.description}</p>
          <img src={Eat} alt="" className="rounded-xl" />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center lg-gap mt-2">
              <div className="flex items-center sm-gap">
                <BiHeart className="cursor-pointer" />
                <span>0</span>
              </div>
              <div className="flex items-center sm-gap">
                <BiComment className="cursor-pointer" />
                <span>0</span>
              </div>
            </div>
            <MdOutlineShare className="cursor-pointer" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
