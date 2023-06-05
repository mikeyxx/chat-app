import React, { useState } from "react";
import IsRegisteredComp from "./IsRegisteredComp";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import { isLoggedIn } from "../feature/state";
import { useNavigate } from "react-router-dom";

const LoginComp = () => {
  const { mode } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { userName, password } = userData;
    try {
      const { data } = await axios.post("http://localhost:3003/auth/login", {
        userName,
        password,
      });
      dispatch(
        isLoggedIn({
          userFirstName: data.firstName,
          user: data.formattedUserData,
          token: data.token,
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: data.formattedUserData,
          userFirstName: data.firstName,
          token: data.token,
        })
      );

      navigate("/feeds");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <main className="pt-28  px-2">
      <section className=" comps flex items-center justify-center  max-w-xl m-auto rounded-xl">
        <div className="w-full p-4">
          <h1 className="mt-4 mb-6">ChirpChat! Keep the Conversation Going.</h1>
          <form className="w-full flex flex-col lg-gap" onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              value={userData.userName}
              placeholder="Username"
              className="border w-full rounded h-10 p-2 focus:outline-primary text-black"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              value={userData.password}
              placeholder="Password"
              className="border w-full rounded h-10 p-2 focus:outline-primary text-black"
              onChange={handleChange}
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
      </section>
    </main>
  );
};

export default LoginComp;
