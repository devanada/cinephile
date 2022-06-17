interface buttonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: buttonProps) => {
  return (
    <button
      className="bg-neutral-500 rounded text-white w-fit p-3 my-2 lg:hidden place-self-center"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
