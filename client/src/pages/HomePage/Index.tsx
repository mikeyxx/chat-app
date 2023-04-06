import Ads from "../../widgets/Ads";
import Feeds from "../../widgets/Feeds";
import UserProfile from "../../components/UserProfile";
import { useAppSelector } from "../../app/store";

const Index = () => {
  const { userProfileData } = useAppSelector((state) => state.users);

  return (
    <div className="pt-24">
      <div className="flex max-w-[1400px] w-full m-auto justify-between lg-gap">
        <UserProfile userId={userProfileData?._id} />
        <Feeds />
        <Ads />
      </div>
    </div>
  );
};

export default Index;
