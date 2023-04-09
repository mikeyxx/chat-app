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
    dispatch(setMode());
  };

  const setLight = () => {
    localStorage.setItem("mode", "light");
    document.documentElement.setAttribute("data-theme", "light");
    dispatch(setMode());
  };

  const toggleTheme = () => {
    if (mode === "dark") {
      setDark();
    } else {
      setLight();
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("mode");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const defaultDark =
      storedTheme === "dark" || (storedTheme === null && prefersDark);
    dispatch(setMode());

    if (defaultDark) {
      setDark();
    } else {
      setLight();
    }

    // Watch for changes in the browser preference and toggle theme accordingly
    const prefersDarkMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    prefersDarkMediaQuery.addEventListener("change", () => {
      if (prefersDarkMediaQuery.matches) {
        setDark();
      } else {
        setLight();
      }
    });

    return () => {
      prefersDarkMediaQuery.removeEventListener("change", () => {
        if (prefersDarkMediaQuery.matches) {
          setDark();
        } else {
          setLight();
        }
      });
    };
  }, []);

  return (
    <>
      <span className="cursor-pointer" onClick={toggleTheme}>
        {mode === "dark" ? (
          <MdLightMode className="text-xl" />
        ) : (
          <MdNightlight className="text-xl" />
        )}
      </span>
    </>
  );
};

export default DarkMode;
