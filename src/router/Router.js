import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Loadable from "../layouts/full/Loadable";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import App from "../App";

const FiscalModules = Loadable(
  React.lazy(() => import("../pages/fiscalModules/FiscalModule"))
);
const Application = Loadable(
  React.lazy(() => import("../pages/application/Application"))
);
const Login = Loadable(React.lazy(() => import("../pages/login/Login")));
const Payment = Loadable(
  React.lazy(() => import("../pages/fmPayment/Payment"))
);
const Profile = Loadable(
  React.lazy(() => import("../pages/profile/Profile"))
);

const RouterConfig = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "modules",
          element: <PrivateRoute isAuth={isAuth} component={FiscalModules} />,
        },
        {
          path: "application",
          element: <PrivateRoute isAuth={isAuth} component={Application} />,
        },
        {
          path: "payment",
          element: <PrivateRoute isAuth={isAuth} component={Payment} />,
        },
        {
          path: "profile",
          element: <PrivateRoute isAuth={isAuth} component={Profile} />,
        },
      ],
    },
    {
      path: "/login",
      element: isAuth ? <Navigate to="/modules" /> : <Login />,
    },
    {
      path: "/*",
      element: isAuth ? <Navigate to="/profile" /> : <Navigate to="/login" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterConfig;
