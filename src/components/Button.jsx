import React from "react";

const Button = (props) => {
  return (
    <button
      className="bg-neutral-500 rounded text-white w-fit p-3 my-2 lg:hidden place-self-center"
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
