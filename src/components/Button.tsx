interface buttonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: buttonProps) => {
  return (
    <button
      className="text-white text-lg bg-neutral-500 dark:bg-zinc-800 rounded-md px-5"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
