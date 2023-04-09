import { useState, useEffect, useRef } from "react";
import { AiFillWechat } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdMessage, MdArrowDropDown } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { isLoggedOut } from "../../feature/state";
import DarkMode from "../../utils/DarkMode";

const index = () => {
  const { token, uName } = useAppSelector((state) => state.users);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const divRef = useRef<HTMLDivElement>(null);
  const [leftVal, setLeft] = useState<number | undefined>(0);

  useEffect(() => {
    const handleScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, [screenSize]);

  const [drop, setDrop] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    setLeft(divRef.current?.getBoundingClientRect().left);
  }, [screenSize]);

  return (
    <>
      {token ? (
        <div className="comps max-w-full h-20 w-full fixed z-50 flex items-center">
          <div className="flex max-w-[1400px] items-center justify-between w-full m-auto px-2">
            <div className="flex items-center lg-gap">
              <div className="flex items-center">
                <span className="text-primary font-bold text-3xl">
                  ChirpChat
                </span>
                <AiFillWechat className="text-3xl" />
              </div>
              {screenSize > 700 && (
                <div className="bg-slate-100 flex items-center py-1 px-3 rounded">
                  <input
                    type="text"
                    placeholder="Search..."
                    className={` text-black rounded focus:outline-none bg-transparent`}
                  />
                  <IoSearch />
                </div>
              )}
            </div>
            <div className={`flex items-cente lg-gap`}>
              <div>
                <DarkMode />
              </div>

              <div
                className="flex bg-slate-200 items-center w-24 justify-between px-2 cursor-pointer rounded text-black"
                ref={divRef}
                onClick={handleDrop}
              >
                <span>{uName}</span>
                <MdArrowDropDown className="text-2xl" />
              </div>
              {drop && (
                <div
                  className={`logout comps absolute w-[146px] top-16 left-[${
                    leftVal + "px"
                  }]`}
                >
                  <div
                    className={`flex items-center justify-around w-full border-b-2`}
                  >
                    <MdMessage className="cursor-pointer" />
                    <IoMdNotifications className="cursor-pointer" />
                  </div>

                  <span
                    className="cursor-pointer border-b-2 w-full"
                    onClick={handleHomeBtnClick}
                  >
                    Home
                  </span>

                  <span className="cursor-pointer" onClick={handleLogout}>
                    Log out
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="comps max-w-full h-20 w-full m-auto flex items-center justify-center fixed z-50">
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
