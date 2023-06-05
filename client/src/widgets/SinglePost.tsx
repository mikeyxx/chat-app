import { BiComment } from "react-icons/bi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShare } from "react-icons/md";
import { useAppSelector } from "../app/store";

const SinglePost = () => {
  const { post } = useAppSelector((state) => state.users);
  const _id = useAppSelector((state) => state.users.userProfileData?._id);

  const checkIsLiked = () => {
    let isLiked = false;
    if (post?.likes) {
      isLiked = Boolean(post.likes[String(_id)]);
    }
    return isLiked;
  };

  const checkLikeCount = () => {
    let likeCount;
    if (post?.likes) {
      likeCount = Object.keys(post.likes).length;
    }
    return likeCount;
  };

  return (
    <main className="comps flex flex-col w-full max-h-fit h-full rounded-xl p-4">
      <section className="flex w-full items-center justify-between">
        <div className="flex sm-gap">
          <img
            src={post?.userPicturePath}
            alt=""
            className="w-[50px] h-[50px] object-cover rounded-[50%]"
          />

          <div className="flex flex-col">
            <span className="font-bold cursor-pointer hover:text-gray-500">
              {post?.firstName} {post?.lastName}
            </span>
            <small>{post?.location}</small>
          </div>
        </div>
      </section>
      <p className="my-4">{post?.description}</p>
      <img src={post?.picturePath} alt="" className="rounded-xl" />
      <section className="flex items-center justify-between w-full">
        <div className="flex items-center lg-gap mt-2">
          <div className="flex items-center sm-gap">
            <div>
              {checkIsLiked() ? (
                <IoMdHeart className="cursor-pointer text-green-400" />
              ) : (
                <IoMdHeartEmpty className="cursor-pointer" />
              )}
            </div>
            <span>{checkLikeCount()}</span>
          </div>
          <div className="flex items-center sm-gap">
            <BiComment className="cursor-pointer" />
            <span>0</span>
          </div>
        </div>
        <MdOutlineShare className="cursor-pointer" />
      </section>
    </main>
  );
};

export default SinglePost;
