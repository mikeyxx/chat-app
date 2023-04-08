import { useEffect } from "react";
import "./DarkMode.css";
import { useAppDispatch, useAppSelector } from "../app/store";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { setMode } from "../feature/state";

const DarkMode = () => {
  const { mode } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const setDark = () => {
    localStorage.setItem("mode", "dark");

    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("mode", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  // 5
  const toggleTheme = () => {
    if (mode === "dark") {
      setDark();
      dispatch(setMode());
    } else {
      setLight();
      dispatch(setMode());
    }
  };

  const storedTheme = localStorage.getItem("mode");
  useEffect(() => {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const defaultDark =
      storedTheme === "dark" || (storedTheme === null && prefersDark);

    if (defaultDark) {
      setDark();
      dispatch(setMode());
    }
  }, []);

  return (
    <span className="cursor-pointer" onClick={toggleTheme}>
      {mode === "light" ? (
        <MdLightMode className="text-xl" />
      ) : (
        <MdNightlight className="text-xl" />
      )}
    </span>
  );
};

export default DarkMode;
