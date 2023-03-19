import Person from "../assets/p3.jpeg";

const FriendsList = () => {
  return (
    <div className="mt-4 flex flex-col bg-white w-full rounded-xl p-4">
      <h3 className="font-bold">Friends List</h3>
      <div className="flex w-full items-center justify-between mt-3">
        <div className="flex sm-gap">
          <img
            src={Person}
            alt=""
            className="w-[40px] h-[40px] object-cover rounded-[50%] "
          />

          <div className="flex flex-col">
            <span className="font-bold text-sm">Ellu P</span>
            <small className="text-xs">Lagos, Nigeria</small>
          </div>
        </div>
        <small className="text-primary cursor-pointer hover:bg-slate-100 px-3 rounded-xl">
          Following
        </small>
      </div>
    </div>
  );
};

export default FriendsList;
