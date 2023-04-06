import { BiHeart, BiComment } from "react-icons/bi";
import { MdOutlineShare } from "react-icons/md";
import { useAppSelector } from "../app/store";
import Person from "../assets/p3.jpeg";
import Eat from "../assets/post1.jpeg";

const SinglePost = () => {
  const { mode, post } = useAppSelector((state) => state.users);

  return (
    <div
      className={`
    ${
      mode === "light" ? "bg-white" : "bg-gray-800"
    } flex flex-col w-full rounded-xl p-4`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex sm-gap">
          <img
            src={Person}
            alt=""
            className="w-[50px] h-[50px] object-cover rounded-[50%]"
          />

          <div className="flex flex-col">
            <span className="font-bold cursor-pointer hover:text-gray-500">
              {post?.firstName} {post?.lastName}
            </span>
            <small>{post?.location}</small>
          </div>
        </div>
        <small className="text-primary cursor-pointer hover:bg-slate-100 px-3 rounded-xl">
          Follow
        </small>
      </div>
      <p className="my-4">{post?.description}</p>
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
  );
};

export default SinglePost;
