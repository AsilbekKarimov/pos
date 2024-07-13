import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Loadable from "../layouts/full/Loadable";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import { useSelector } from "react-redux";
import App from "../App";

const FiscalModules = Loadable(
  lazy(() => import("../pages/fiscalModules/FiscalModule"))
);
const Application = Loadable(
  lazy(() => import("../pages/application/Application"))
);
const Login = Loadable(lazy(() => import("../pages/login/Login")));
const Payment = Loadable(lazy(() => import("../pages/fmPayment/Payment")));
const Reestr = Loadable(lazy(() => import("../pages/reestr/Reestr")));

const RouterConfig = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log("isAuth: ", isAuth);

  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to={isAuth ? "/modules" : "/login"} />,
    },
    {
      path: "app",
      element: isAuth ? <App /> : <Navigate to="/login" />,
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
    {
      path: "/login",
      element: isAuth ? <Navigate to="/modules" /> : <Login />,
    },
    {
      path: "*",
      element: <Navigate to={isAuth ? "/modules" : "/login"} />,
    },
  ]);

  return routes;
};

export default RouterConfig;
