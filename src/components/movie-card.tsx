import { Link } from "react-router-dom";

import Button from "@/components/button";
import { MovieType } from "@/utils/apis/movies";
import { useToken } from "@/utils/contexts/token";

interface MovieCardProps {
  item: MovieType;
  navigate: string;
  button_label: string;
  loading?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const MovieCard = (props: MovieCardProps) => {
  const { item, navigate, button_label, loading, onClick, hover } = props;
  const { userID } = useToken();

  return (
    <div
      key={item.id}
      className={`card card-compact rounded-lg bg-zinc-500 shadow-lg shadow-black dark:bg-base-100 ${
        hover && "transform transition duration-500 hover:z-20 hover:scale-110"
      }`}
    >
      <figure>
        <Link id={`btn-detail-${item.id}`} to={navigate}>
          <img
            className="aspect-[2/3] object-cover"
            src={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={item.poster_path}
          />
        </Link>
      </figure>
      <div className="card-body items-center justify-between text-center">
        <Link id={`btn-detail-${item.id}`} to={navigate}>
          <p className="card-title text-white" onClick={onClick}>
            {item.title}
          </p>
        </Link>
        <div className="card-actions">
          {userID !== "" && (
            <Button
              id={`btn-fav-${item.id}`}
              label={button_label}
              onClick={onClick}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
