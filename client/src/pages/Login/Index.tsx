import React, { useState } from "react";
import { useAppSelector } from "../../app/store";
import LoginComp from "../../components/LoginComp";
import RegisterComp from "../../components/RegisterComp";

const Index = () => {
  const { isRegistered } = useAppSelector((state) => state.users);
  return <div>{isRegistered ? <LoginComp /> : <RegisterComp />}</div>;
};

export default Index;
