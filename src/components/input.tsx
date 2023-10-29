import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input(props: InputProps) {
  const { label, id, type } = props;

  return (
    <div className="flex flex-col mb-4">
      <label
        className="text-black dark:text-white tracking-wider mb-3"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={
          "border rounded-lg bg-slate-200 dark:bg-neutral-600 text-black dark:text-white p-2 focus:outline-none focus:border-slate-200 focus:ring-1 focus:ring-slate-200 w-full"
        }
        type={type}
        {...props}
      />
    </div>
  );
}
