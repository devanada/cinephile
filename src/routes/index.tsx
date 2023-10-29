import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

import Homepage from "@/pages";
import NotFoundPage from "@/pages/404";
import Auth from "@/pages/auth";
import Search from "@/pages/search";
import Favorites from "@/pages/favorites";
import Detail from "@/pages/detail";
import { useToken } from "@/utils/contexts/token";
import { setAxiosConfig } from "@/utils/apis/axiosWithConfig";

export default function Router() {
  const { token } = useToken();

  useEffect(() => {
    setAxiosConfig(token);
  }, [token]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/auth",
      element: token !== "" ? <Navigate to="/" /> : <Auth />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/favorites",
      element: token === "" ? <Navigate to="/auth" /> : <Favorites />,
    },
    {
      path: "/detail/:movie_id",
      element: <Detail />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
