import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Loadable from "../layouts/full/Loadable";
import App from "../App";
import PrivateRoute from "../components/privateRoute/PrivateRoute";

const FiscalModules = Loadable(
  lazy(() => import("../pages/fiscalModules/FiscalModule"))
);
const Application = Loadable(
  lazy(() => import("../pages/application/Application"))
);
const Payment = Loadable(lazy(() => import("../pages/fmPayment/Payment")));
const Reestr = Loadable(lazy(() => import("../pages/reestr/Reestr")));

const RouterConfig = ({ isAuth }) => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/app" />,
      errorElement: <div>ERROR</div>,
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
    { path: "*", element: <div>404 Not Found</div> },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default RouterConfig;
