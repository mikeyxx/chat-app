import { BiHeart, BiComment } from "react-icons/bi";
import { MdOutlineShare } from "react-icons/md";
import Person from "../assets/p3.jpeg";
import Eat from "../assets/post1.jpeg";

const Posts = () => {
  return (
    <div className="mt-4 flex flex-col bg-white w-full rounded-xl p-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex sm-gap">
          <img
            src={Person}
            alt=""
            className="w-[50px] h-[50px] object-cover rounded-[50%] "
          />

          <div className="flex flex-col">
            <span className="font-bold">Ellu P</span>
            <small>Lagos, Nigeria</small>
          </div>
        </div>
        <small className="text-primary cursor-pointer hover:bg-slate-100 px-3 rounded-xl">
          Follow
        </small>
      </div>
      <p className="my-4">Decided to eat healthy today</p>
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

export default Posts;
