import * as FontAwesome from "react-icons/fa";
import React, { FC } from "react";

interface Props extends React.SVGAttributes<SVGElement> {
  icon: keyof typeof FontAwesome;
  id: string;
}

const ReuseIcon: FC<Props> = ({ icon, id, ...props }) => {
  const Icon = FontAwesome[icon];
  return <Icon id={id} className="h-8 w-8 text-white" {...props} />;
};

export default ReuseIcon;
