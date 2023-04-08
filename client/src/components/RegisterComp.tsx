import axios from "axios";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/store";
import { setIsRegistered } from "../feature/state";
import IsRegisteredComp from "./IsRegisteredComp";

const RegisterComp = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    picturePath: "",
    location: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const picturePath = URL.createObjectURL(file);
    setUserData({ ...userData, picturePath });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("userName", userData.userName);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("picturePath", userData.picturePath);
      formData.append("location", userData.location);
      formData.append("bio", userData.bio);

      const { data } = await axios.post(
        "http://localhost:3003/auth/register/",
        formData
      );
      dispatch(setIsRegistered());
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="pt-28">
      <div className="comps flex items-center justify-center  max-w-xl m-auto rounded-xl mb-3">
        <div className="w-full p-4">
          <h1 className="mt-4 mb-6">ChirpChat! Keep the Conversation Going.</h1>
          <form
            className="w-full flex flex-col lg-gap text-black"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex lg-gap rounded">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="border w-full rounded h-10 p-2 focus:outline-primary"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="border w-full rounded h-10 p-2 focus:outline-primary"
              />
            </div>

            <input
              type="text"
              placeholder="Username"
              name="userName"
              value={userData.userName}
              onChange={handleChange}
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={userData.bio}
              onChange={handleChange}
              className="resize-none border w-full rounded p-2 focus:outline-primary"
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={userData.location}
              onChange={handleChange}
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />

            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border w-full rounded h-10 p-2 focus:outline-primary"
            />

            <input
              type="file"
              name="picturePath"
              accept=".png, .jpg, .jpeg"
              onChange={handleAddPhoto}
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

export default RegisterComp;
