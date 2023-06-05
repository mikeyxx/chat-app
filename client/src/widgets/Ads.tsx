import FriendsList from "./FriendsList";
import Cosmetics from "../assets/info4.jpeg";
import { useState, useEffect } from "react";

const Ads = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

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
    <main
      className={`flex flex-col ${
        screenSize > 920 && "max-w-[390px]"
      } w-full  max-h-fit h-full`}
    >
      <section className="comps rounded-xl flex flex-col p-4 items-center justify-between">
        <div className="flex justify-between items-center w-full">
          <span className="font-bold">Sponsored</span>
          <small className="cursor-pointer hover:bg-slate-100 py-1 px-2 rounded-2xl hover:text-black">
            Create Ads
          </small>
        </div>
        <div className="my-3">
          <img src={Cosmetics} alt="" className="rounded-xl" />
        </div>
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <span>Company</span>
            <span>www.company.com</span>
          </div>
          <small className="mt-2 inline-block">
            Introducing our new nourishing facial serum, designed to give your
            skin a healthy and radiant glow. Formulated with a blend of natural
            ingredients including Vitamin C, Hyaluronic Acid, and Jojoba Oil,
            this serum works to deeply hydrate and plump your skin, while also
            brightening and evening out your complexion{" "}
          </small>
        </div>
      </section>
      <FriendsList />
    </main>
  );
};

export default Ads;
