import { FC, ReactNode, useState, useRef, useEffect } from "react";

import { MovieType } from "@/utils/apis/movies";

interface Props {
  datas: any[];
  content: (data: any) => ReactNode;
  name: string;
  fullWidth?: boolean;
}

const Carousel: FC<Props> = ({ datas, content, name, fullWidth }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel?.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="h-96 w-full">
      <div className="relative h-full w-full overflow-hidden">
        <div className="top left absolute flex h-full w-full justify-between">
          <button
            id="carousel-prev"
            className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-white/30 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25 dark:hover:bg-black/30"
            onClick={movePrev}
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-5 h-12 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            id="carousel-next"
            className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:bg-white/30 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25 dark:hover:bg-black/30"
            onClick={moveNext}
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-5 h-12 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="carousel h-full w-full gap-3 py-6" ref={carousel}>
          {datas.map((data: MovieType, index: number) => (
            <div
              key={data.id}
              id={`${name}-${index}`}
              className={`carousel-item relative justify-center ${
                fullWidth ? "w-full" : ""
              }`}
            >
              {content(data)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
