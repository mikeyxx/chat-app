import React from "react";
import { useAppSelector, useAppDispatch } from "../app/store";
import { setIsRegistered } from "../feature/state";

const IsRegisteredComp = () => {
  const { isRegistered } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleIsRegistered = () => {
    dispatch(setIsRegistered());
  };
  return (
    <main>
      <p className="mt-5 mb-2">
        {isRegistered ? "Don't have an account?" : "Have an account"}{" "}
        <span
          onClick={handleIsRegistered}
          className="cursor-pointer text-primary"
        >
          {isRegistered ? "Register" : "Login"}
        </span>
      </p>
    </main>
  );
};

export default IsRegisteredComp;
