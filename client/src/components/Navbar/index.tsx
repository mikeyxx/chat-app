import { useState } from "react";
import { AiFillWechat } from "react-icons/ai";
import {
  MdLightMode,
  MdNightlight,
  MdMessage,
  MdArrowDropDown,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { useAppSelector } from "../../app/store";

const index = () => {
  const { mode } = useAppSelector((state) => state.users);
  const [drop, setDrop] = useState(false);

  const handleLogout = () => {
    setDrop(!drop);
  };
  const token = true;
  return (
    <>
      {token ? (
        <div className="bg-white max-w-full h-20 w-full fixed z-50 flex items-center">
          <div className="flex max-w-[1400px] items-center justify-between w-full m-auto">
            <div className="flex items-center lg-gap">
              <div className="flex items-center">
                <span className="text-primary font-bold text-3xl">
                  ChirpChat
                </span>
                <AiFillWechat className="text-3xl" />
              </div>
              <div className="bg-slate-100 flex items-center py-1 px-3 rounded">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded focus:outline-none bg-transparent"
                />
                <IoSearch />
              </div>
            </div>
            <div className="flex items-center lg-gap">
              <span className="cursor-pointer">
                {mode === "light" ? (
                  <MdLightMode className="text-xl" />
                ) : (
                  <MdNightlight className="text-xl" />
                )}
              </span>
              <MdMessage className="text-xl cursor-pointer" />
              <IoMdNotifications className="text-xl cursor-pointer" />
              <div
                className="flex bg-slate-200 items-center w-24 justify-between px-2 cursor-pointer rounded"
                onClick={handleLogout}
              >
                <span>Mike</span>
                <MdArrowDropDown className="text-2xl" />
              </div>
              {drop && <span className="logout cursor-pointer">Log out</span>}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white max-w-full h-20 w-full m-auto flex items-center justify-center fixed z-50">
          <div className="flex">
            <span className="text-primary font-bold text-3xl">ChirpChat</span>
            <AiFillWechat className="text-3xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default index;
