import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "../components/privateRoute/PrivateRoute";
import App from "../App";

const FiscalModules = React.lazy(() =>
  import("../pages/fiscalModules/FiscalModule")
);
const Application = React.lazy(() =>
  import("../pages/application/Application")
);
const Login = React.lazy(() => import("../pages/login/Login"));
const Payment = React.lazy(() => import("../pages/fmPayment/Payment"));
const UserFiscal = React.lazy(() => import("../pages/profile/userFiscals"))

const RouterConfig = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
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
          element: <PrivateRoute isAuth={isAuth} component={UserFiscal} />,
        },
      ],
    },
    {
      path: "/login",
      element: isAuth ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/*",
      element: isAuth ? <Navigate to="/" /> : <Navigate to="/login" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterConfig;
