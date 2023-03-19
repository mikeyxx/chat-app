import React from "react";
import { useAppSelector, useAppDispatch } from "../app/store";
import { setIsRegistered } from "../feature/state";
import IsRegisteredComp from "./IsRegisteredComp";

const RegisterComp = () => {
  const dispatch = useAppDispatch();
  const { isRegistered } = useAppSelector((state) => state.users);
  return (
    <div className="pt-28">
      <div className="bg-white flex items-center justify-center  max-w-xl m-auto rounded-xl mb-3">
        <div className="w-full p-4">
          <h1 className="mt-4 mb-6">ChirpChat! Keep the Conversation Going.</h1>
          <form className="w-full flex flex-col lg-gap">
            <div className="w-full flex lg-gap rounded">
              <input
                type="text"
                placeholder="First Name"
                className="border w-full rounded h-10 p-2 focus:outline-primary"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border w-full rounded h-10 p-2 focus:outline-primary"
              />
            </div>

            <input
              type="text"
              placeholder="Username"
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />
            <textarea
              name="bio"
              placeholder="Bio"
              className="resize-none border w-full rounded p-2 focus:outline-primary"
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />

            <input
              type="email"
              placeholder="Email"
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />

            <input type="file" accept="images/*" />

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

export default RegisterComp;
