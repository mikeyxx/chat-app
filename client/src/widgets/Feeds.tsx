import person from "../assets/p3.jpeg";
import { BsImage } from "react-icons/bs";
import { RiFileGifLine } from "react-icons/ri";
import { TfiClip } from "react-icons/tfi";
import { AiFillAudio } from "react-icons/ai";
import Posts from "./Posts";

const Feeds = () => {
  return (
    <div className="flex flex-col flex-1 grow-[2] max-h-fit h-full mb-3">
      <div className="flex flex-col bg-white w-full rounded-xl p-4 items-center justify-between  ">
        <div className="flex items-center justify-between w-full sm-gap">
          <img
            src={person}
            alt=""
            className="w-[57px] h-[50px] object-cover rounded-[50%] "
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="bg-slate-100 w-full h-[50px] rounded-3xl p-4 focus:outline-primary"
          />
        </div>
        <hr className="inline-block w-full m-5" />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl">
            <BsImage />
            <small>Image</small>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl">
            <RiFileGifLine />
            <small>Clip</small>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl">
            <TfiClip />
            <small>Attachment</small>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl">
            <AiFillAudio />
            <small>Audio</small>
          </div>
          <button className="bg-primary py-1 px-4 rounded-2xl font-bold hover:bg-slate-300">
            Post
          </button>
        </div>
      </div>
      <Posts />
    </div>
  );
};

export default Feeds;
