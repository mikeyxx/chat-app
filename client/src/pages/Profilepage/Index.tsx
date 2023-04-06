import UserProfile from "../../components/UserProfile";
import SinglePost from "../../widgets/SinglePost";
import { useParams } from "react-router-dom";

const Index = () => {
  const { userId } = useParams();
  return (
    <div className="pt-24">
      <div className="flex max-w-[1000px] w-full m-auto justify-between lg-gap">
        <UserProfile userId={userId} />
        <SinglePost />
      </div>
    </div>
  );
};

export default Index;
