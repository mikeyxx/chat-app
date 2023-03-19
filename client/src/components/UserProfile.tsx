import { MdPersonAddAlt, MdOutlineLocationOn } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import person from "../assets/p3.jpeg";
import Twitter from "../assets/twitter.png";
import LinkedIn from "../assets/linkedin.png";

const UserProfile = () => {
  return (
    <div className="flex flex-col bg-white w-full p-4 max-w-[390px] rounded-xl max-h-fit h-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex sm-gap">
          <img
            src={person}
            alt=""
            className="w-[50px] h-[50px] object-cover rounded-[50%] "
          />

          <div className="flex flex-col">
            <span className="font-bold">Mike</span>
            <small>0 friends</small>
          </div>
        </div>
        <MdPersonAddAlt className="hover:bg-slate-100 rounded-xl cursor-pointer w-6 h-6 p-1" />
      </div>
      <hr className="inline-block w-full m-5" />

      <div className="flex items-center sm-gap">
        <MdOutlineLocationOn />
        <span>Lagos to the world 📍</span>
      </div>
      <div className="flex items-center sm-gap">
        <IoBriefcaseOutline />
        <span>Software Developer</span>
      </div>
      <hr className="inline-block w-full m-5" />
      <div className="flex items-center justify-between">
        <small>Who's viewed your profile</small>
        <small>1,300</small>
      </div>
      <div className="flex items-center justify-between">
        <small>Impressions on your posts</small>
        <small>3,300</small>
      </div>
      <hr className="inline-block w-full m-5" />
      <div>
        <h3 className="font-bold mb-3">Social Profiles</h3>
        <div className="flex items-center sm-gap">
          <img src={Twitter} alt="" />
          <div className="flex flex-col">
            <span className="font-bold">Twitter</span>
            <small>Social Network</small>
          </div>
        </div>
        <div className="flex items-center sm-gap mt-3">
          <img src={LinkedIn} alt="" />
          <div className="flex flex-col">
            <span className="font-bold">LinkedIn</span>
            <small>Networking Platform</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
