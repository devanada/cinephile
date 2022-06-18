import { Link } from "react-router-dom";

interface movieType {
  id: number;
  title: string;
  poster_path: string;
}

interface movieCartType {
  item: movieType;
  navigate: string;
  button_label: string;
  onClick?: () => void;
}

const MovieCard = ({
  item,
  navigate,
  button_label,
  onClick,
}: movieCartType) => {
  return (
    <div
      key={item.id}
      className="container grow p-3 flex flex-col justify-between bg-zinc-800 dark:bg-neutral-500 rounded shadow-lg shadow-black"
    >
      <Link to={navigate}>
        <img
          className="max-w-full h-auto"
          width="500"
          height="750"
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={item.poster_path}
        />
        <p
          className="text-center text-white font-bold text-xl mb-2"
          onClick={onClick}
        >
          {item.title}
        </p>
      </Link>
      <button
        className="text-white text-lg bg-neutral-500 dark:bg-zinc-800 rounded-md"
        onClick={onClick}
      >
        {button_label}
      </button>
    </div>
  );
};

export default MovieCard;
