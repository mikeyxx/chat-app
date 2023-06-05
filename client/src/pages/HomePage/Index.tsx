import { useState, useEffect } from "react";
import Ads from "../../widgets/Ads";
import Feeds from "../../widgets/Feeds";
import UserProfile from "../../components/UserProfile";
import { useAppSelector } from "../../app/store";

const Index = () => {
  const { userProfileData } = useAppSelector((state) => state.users);
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
    <main className="pt-24 pb-3 overflow-x-hidden px-2">
      {screenSize >= 920 ? (
        <section className="flex max-w-[1400px] w-full m-auto justify-between lg-gap">
          <UserProfile userId={userProfileData?._id} />
          <Feeds />
          <Ads />
        </section>
      ) : (
        <section className="flex flex-col w-full m-auto justify-between sm-gap overflow-x-hidden">
          <UserProfile userId={userProfileData?._id} />
          <Feeds />
          <Ads />
        </section>
      )}
    </main>
  );
};

export default Index;
