interface buttonProps {
  id: string;
  label: string;
  onClick?: () => void;
}

const Button = ({ id, label, onClick }: buttonProps) => {
  return (
    <button
      type="button"
      id={id}
      className="text-white text-lg bg-neutral-500 dark:bg-zinc-800 rounded-md p-2 font-bold"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
