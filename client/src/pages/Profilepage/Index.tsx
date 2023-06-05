import { useEffect, useState } from "react";
import UserProfile from "../../components/UserProfile";
import SinglePost from "../../widgets/SinglePost";
import { useParams } from "react-router-dom";

const Index = () => {
  const { userId } = useParams();
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
    <main className="pt-24">
      <section
        className={`flex ${
          screenSize <= 700 ? "flex-col" : "flex-row"
        } max-w-[1000px] w-full m-auto justify-between lg-gap px-2`}
      >
        <UserProfile userId={userId} />
        <SinglePost />
      </section>
    </main>
  );
};

export default Index;
