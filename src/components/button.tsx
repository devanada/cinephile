import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
}

const Button: FC<Props> = ({ id, label, onClick, loading, ...props }) => {
  return (
    <button
      id={id}
      className={`btn w-full border-zinc-800 bg-zinc-500 p-2 font-bold text-white hover:bg-zinc-400/90 dark:border-zinc-500 dark:bg-zinc-800 dark:hover:bg-zinc-700/90 ${
        loading ? "cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
