import Lottie from "lottie-react";

import LoadingLight from "@/assets/lottie/movie_loading_light.json";
import LoadingDark from "@/assets/lottie/movie_loading_dark.json";
import { useTheme } from "@/utils/contexts/theme";

const Loading = () => {
  const { theme } = useTheme();

  return (
    <Lottie
      className="rounded-full bg-black dark:bg-white"
      loop
      autoplay
      animationData={theme === "dark" ? LoadingLight : LoadingDark}
    />
  );
};

export default Loading;
