import { useContext } from "react";
import Lottie from "lottie-react";
import { ThemeContext } from "../utils/context";
import LoadingDark from "../assets/lottie/movie_loading_dark.json";
import LoadingLight from "../assets/lottie/movie_loading_light.json";
import { contextType } from "../types/context";

const Loading = () => {
  const { theme } = useContext<contextType>(ThemeContext);
  return (
    <Lottie
      className="bg-black dark:bg-white rounded-full"
      loop
      autoplay
      animationData={theme === "dark" ? LoadingLight : LoadingDark}
    />
  );
};

export default Loading;
