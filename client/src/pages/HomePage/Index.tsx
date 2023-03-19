import Ads from "../../widgets/Ads";
import Feeds from "../../widgets/Feeds";
import UserProfile from "../../components/UserProfile";

const Index = () => {
  return (
    <div className="pt-24">
      <div className="flex max-w-[1400px] w-full m-auto justify-between lg-gap">
        <UserProfile />
        <Feeds />
        <Ads />
      </div>
    </div>
  );
};

export default Index;
