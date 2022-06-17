import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component: FC) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();

    return <Component {...props} navigate={navigate} />;
  };

  return Wrapper;
};

export const readParams = (Component: FC) => {
  const Wrapper = (props: any) => {
    const params = useParams();

    return <Component {...props} params={params} />;
  };

  return Wrapper;
};
