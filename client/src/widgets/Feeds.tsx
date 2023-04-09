import { BsImage } from "react-icons/bs";
import { RiFileGifLine } from "react-icons/ri";
import { TfiClip } from "react-icons/tfi";
import { AiFillAudio } from "react-icons/ai";
import Posts from "./Posts";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { setFeeds } from "../feature/state";

const Feeds = () => {
  const { token, posts, isLiked, userProfileData } = useAppSelector(
    (state) => state.users
  );
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const dispatch = useAppDispatch();
  const [postData, setPostData] = useState({
    description: "",
    picturePath: "",
  });

  const handlePhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const picturePath = URL.createObjectURL(file);
    setPostData({ ...postData, picturePath });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", postData.description);
      formData.append("picturePath", postData.picturePath);

      const { data } = await axios.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPostData({
        description: "",
        picturePath: "",
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getPostFeeds = async () => {
    try {
      const { data } = await axios.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setFeeds(data));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPostFeeds();
  }, [postData, isLiked]);

  useEffect(() => {
    const handleScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, [screenSize]);

  return (
    <div className="flex flex-col flex-1 grow-[2] max-h-fit h-full mb-3">
      <div className="comps flex flex-col w-full rounded-xl p-4 items-center justify-between">
        <div className="flex items-center justify-between w-full sm-gap">
          <img
            src={userProfileData?.picturePath}
            alt=""
            className="w-[57px] h-[50px] object-cover rounded-[50%] "
          />
          <input
            type="text"
            name="description"
            value={postData.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
            placeholder="What's on your mind?"
            className="bg-slate-100 w-full h-[50px] rounded-3xl p-4 focus:outline-primary text-black"
          />
        </div>
        <hr className="inline-block w-full m-5" />
        <form
          className="flex items-center justify-between w-full"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl hover:text-black">
            <label htmlFor="picturePath" className="flex items-center gap-1">
              {postData.picturePath === "" ? (
                <div className="flex items-center gap-1">
                  <BsImage />
                  <small>Image</small>
                </div>
              ) : (
                <span className="text-sm bg-slate-200 px-1 rounded-xl">
                  Image Uploaded
                </span>
              )}
            </label>
            <input
              type="file"
              name="picturePath"
              id="picturePath"
              hidden
              onChange={handlePhotoAdd}
            />
          </div>
          {screenSize > 420 && (
            <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl hover:text-black">
              <RiFileGifLine />
              <small>Clip</small>
            </div>
          )}
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl hover:text-black">
            <TfiClip />
            <small>Attachment</small>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl hover:text-black">
            <AiFillAudio />
            <small>Audio</small>
          </div>
          <button
            className="bg-primary py-1 px-4 rounded-2xl font-bold hover:bg-slate-300"
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
      {posts.map((post) => (
        <Posts key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feeds;
