import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Loadable from "../layouts/full/Loadable";
import App from "../App";
import PrivateRoute from "../components/privateRoute/PrivateRoute";

import { useSelector } from "react-redux";

const FiscalModules = Loadable(
  lazy(() => import("../pages/fiscalModules/FiscalModule"))
);
const Application = Loadable(
  lazy(() => import("../pages/application/Application"))
);
const Login = Loadable(
  lazy(() => import("../pages/login/Login"))
);
const Payment = Loadable(lazy(() => import("../pages/fmPayment/Payment")));
const Reestr = Loadable(lazy(() => import("../pages/reestr/Reestr")));

const RouterConfig = () => {
  const isAuth = useSelector(state => state.auth.isAuth)
  console.log("isAuth: ", isAuth);

  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to={isAuth ? "/app" : "/login"} />,
      children: [
        {
          path: "app",
          element: <App />,
        },
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
          path: "reestr",
          element: <PrivateRoute isAuth={isAuth} component={Reestr} />,
        },
      ],
    },
    {
      path: "/login",
      element: isAuth ? <Navigate to={"/app"} /> : <Login />,
    },
    {
      path: "*",
      element: <Navigate to={isAuth ? "/app" : "/login"} />,
    },
  ]);

  return (
    <Suspense
      fallback={
        <div className="loading loading-spinner loading-lg flex justify-center items-center h-screen mx-auto">
          Loading...
        </div>
      }
    >
      {routes}
    </Suspense>
  );
};

export default RouterConfig;
