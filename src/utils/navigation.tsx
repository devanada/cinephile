import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component: FC) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();
    const params = useParams();

    return <Component {...props} navigate={navigate} params={params} />;
  };

  return Wrapper;
};
