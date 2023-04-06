import { useState } from "react";
import { AiFillWechat } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  MdLightMode,
  MdNightlight,
  MdMessage,
  MdArrowDropDown,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { isLoggedOut, setMode } from "../../feature/state";

const index = () => {
  const { mode, token, uName } = useAppSelector((state) => state.users);

  const [drop, setDrop] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDarkMode = () => {
    if (mode === "light") {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      dispatch(setMode());
    } else {
      dispatch(setMode());
      document.body.style.backgroundColor = "#f2f2f2";
      document.body.style.color = "black";
    }
  };

  const handleDrop = () => {
    setDrop(!drop);
  };

  const handleLogout = () => {
    setDrop(false);
    dispatch(isLoggedOut());
    localStorage.removeItem("user");
  };

  const handleHomeBtnClick = () => {
    navigate("/feeds");
    window.location.reload();
  };

  return (
    <>
      {token ? (
        <div
          className={`
            ${mode === "light" ? "bg-white" : "bg-gray-800"}
          max-w-full h-20 w-full fixed z-50 flex items-center`}
        >
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
                  className={` text-black rounded focus:outline-none bg-transparent`}
                />
                <IoSearch />
              </div>
            </div>
            <div className="flex items-center lg-gap">
              <span className="cursor-pointer" onClick={handleDarkMode}>
                {mode === "light" ? (
                  <MdLightMode className="text-xl" />
                ) : (
                  <MdNightlight className="text-xl" />
                )}
              </span>
              <MdMessage className="text-xl cursor-pointer" />
              <IoMdNotifications className="text-xl cursor-pointer" />
              <div
                className="flex bg-slate-200 items-center w-24 justify-between px-2 cursor-pointer rounded text-black"
                onClick={handleDrop}
              >
                <span>{uName}</span>
                <MdArrowDropDown className="text-2xl" />
              </div>
              {drop && (
                <div className="logout">
                  <span
                    className="bg-white text-black cursor-pointer"
                    onClick={handleHomeBtnClick}
                  >
                    Home
                  </span>
                  <span
                    className="bg-red-500 text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log out
                  </span>
                </div>
              )}
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
