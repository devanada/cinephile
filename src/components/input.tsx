import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input(props: InputProps) {
  const { label, id, type } = props;

  return (
    <div className="mb-4 flex flex-col">
      <label
        className="mb-3 tracking-wider text-black dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={
          "w-full rounded-lg border bg-slate-200 p-2 text-black focus:border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-200 dark:bg-neutral-600 dark:text-white"
        }
        type={type}
        {...props}
      />
    </div>
  );
}
