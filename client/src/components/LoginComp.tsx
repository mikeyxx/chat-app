import React from "react";
import IsRegisteredComp from "./IsRegisteredComp";

const LoginComp = () => {
  return (
    <div className="pt-28">
      <div className="bg-white flex items-center justify-center  max-w-xl m-auto rounded-xl ">
        <div className="w-full p-4">
          <h1 className="mt-4 mb-6">ChirpChat! Keep the Conversation Going.</h1>
          <form className="w-full flex flex-col lg-gap">
            <input
              type="text"
              placeholder="Username"
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />

            <input
              type="password"
              placeholder="Password"
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />

            <button
              type="submit"
              className="bg-primary h-10 p-2 rounded font-bold"
            >
              Submit
            </button>
          </form>

          <IsRegisteredComp />
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
