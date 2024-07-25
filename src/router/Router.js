import React, { Suspense } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loadable from "../layouts/full/Loadable";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import App from "../App";
import DataTable from "../pages/application/applicationFetch";

const FiscalModules = Loadable(React.lazy(() => import("../pages/fiscalModules/FiscalModule")));
const Application = Loadable(React.lazy(() => import("../pages/application/Application")));
const Login = Loadable(React.lazy(() => import("../pages/login/Login")));
const Payment = Loadable(React.lazy(() => import("../pages/fmPayment/Payment")));
const Reestr = Loadable(React.lazy(() => import("../pages/reestr/Reestr")));

const RouterConfig = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

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
      path: "DataTable",
      element: <PrivateRoute isAuth={isAuth} component={DataTable} />,
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

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      {routes}
    </Suspense>
  );
};

export default RouterConfig;
